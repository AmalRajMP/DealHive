import pandas as pd
import os

#To save the trained ML models and load them later
import joblib 

#For splitting the data for training and testing
from sklearn.model_selection import train_test_split 

# ML model that uses multiple decision trees and predicts the final class by majority vote
from sklearn.ensemble import RandomForestClassifier

#To evaluate model performance
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score

# Used to balance the dataset by resampling classes
# Example: class 0 → 100 samples, class 1 → 100 samples
from sklearn.utils import resample

#Load dataset from the /datasets folder
DATA_PATH = os.path.join("datasets", "mongo_dataset.csv")

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found: {DATA_PATH}")

df = pd.read_csv(DATA_PATH)

action_map = {
    "viewed product": 1,
    "view": 1,
    "search": 2,
    "added to wishlist": 3,
    "wishlist": 3,
    "added to cart": 4,
    "placed order": 5,
    "purchased": 5
}

# Clean action column to ensure consistent formatting before mapping to numeric scores
df["action"] = df["action"].astype(str).str.lower().str.strip()

# Create a new column 'action_score' by mapping actions to their corresponding numeric scores
df["action_score"] = df["action"].map(action_map).fillna(0)

# sort by time

# Convert timestamp column from string to datetime for time-based operations
df["timestamp"] = pd.to_datetime(df["timestamp"])

# Sort by timestamp and reset the index to start from 0
df = df.sort_values("timestamp").reset_index(drop=True)

# Recency feature

# Create a column storing previous interaction timestamp for each user
df["prev_time"] = df.groupby("user_id")["timestamp"].shift(1)

# Calculate time gap between current and previous interaction
df["recency_seconds"] = (
    df["timestamp"] - df["prev_time"]
).dt.total_seconds()

# Fill missing recency values with median time gap
df["recency_seconds"] = df["recency_seconds"].fillna(
    df["recency_seconds"].median()
)

# Count how many previous interactions this user has had with this category
df["user_cat_count"] = df.groupby(["user_id", "category"]).cumcount() # .cumcount() counts prev rows

# Count total number of previous interactions performed by this user
df["user_total_prev"] = df.groupby("user_id").cumcount()

# Calculate user's preference strength for this category
# (category interactions ÷ total interactions)
# replace(0,1) prevents division by zero for first interaction
df["user_category_affinity"] = (
    df["user_cat_count"] /
    df["user_total_prev"].replace(0, 1)
)

# Create target variable (what the model predicts)
# Label = 1 if action is purchase (action_score == 5), else 0
df["label"] = (df["action_score"] == 5).astype(int)

# ----------------------------
# USER PRICE FEATURES
# ----------------------------
df["user_avg_price"] = df.groupby("user_id")["price"].transform("mean")
df["price_diff_from_avg"] = abs(df["price"] - df["user_avg_price"])

# =====================================================
# STRONG BEHAVIOR FEATURES (IMPORTANT SECTION)
# =====================================================

# total actions by user so far
df["user_total_actions"] = df.groupby("user_id").cumcount()

# past purchases count
df["user_past_purchases"] = (
    df.groupby("user_id")["label"]
    .cumsum()
    .shift(1)
    .fillna(0)
)

# product popularity
df["product_popularity"] = df.groupby("product_id").cumcount()

# product conversion rate
product_purchase = df.groupby("product_id")["label"].transform("sum")
product_views = df.groupby("product_id")["label"].transform("count")

df["product_conversion_rate"] = product_purchase / product_views

# =====================================================
# FEATURES / TARGET SPLIT
# =====================================================
y = df["label"]

X = df.drop(columns=[
    "label",
    "timestamp",
    "prev_time",
    "action",
    "action_score",
    "product_id"
], errors="ignore")

# encode categoricals
X = pd.get_dummies(X, drop_first=True)

# ----------------------------
# TRAIN TEST SPLIT
# ----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# ----------------------------
# BALANCE TRAIN DATA
# ----------------------------
train_df = X_train.copy()
train_df["label"] = y_train

majority = train_df[train_df.label == 0]
minority = train_df[train_df.label == 1]

if len(minority) == 0:
    raise ValueError("No purchase samples found in training data.")

minority_upsampled = resample(
    minority,
    replace=True,
    n_samples=len(majority),
    random_state=42
)

balanced_df = pd.concat([majority, minority_upsampled])

X_train = balanced_df.drop("label", axis=1)
y_train = balanced_df["label"]

# ----------------------------
# MODEL
# ----------------------------
model = RandomForestClassifier(
    n_estimators=350,
    max_depth=20,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# ----------------------------
# EVALUATION
# ----------------------------
y_probs = model.predict_proba(X_test)[:, 1]
y_pred = (y_probs > 0.5).astype(int)

print("\nModel Evaluation Results")
print("------------------------")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("ROC AUC:", roc_auc_score(y_test, y_probs))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred, zero_division=0))

# ----------------------------
# SAVE MODEL
# ----------------------------
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_DIR, "recommender_model.pkl")
joblib.dump(model, MODEL_PATH)

print("\nModel saved at:", MODEL_PATH)

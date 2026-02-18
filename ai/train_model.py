import pandas as pd
import os
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# ----------------------------
# Load Data
# ----------------------------
df = pd.read_csv("datasets/final_dataset.csv")

# ----------------------------
# DEFINE TARGET (REAL SIGNAL)
# ----------------------------
# strong intent actions = cart or purchase
df["strong_action"] = (df["action_score"] >= 4).astype(int)

y = df["strong_action"]

# ----------------------------
# Features
# ----------------------------
X = df.drop(columns=[
    "strong_action",
    "action",
    "timestamp",
    "action_score",
    "purchase_count",
    "user_purchase_ratio",
    "category_conversion_rate"
], errors="ignore")


# Encode categorical features
X = pd.get_dummies(X, drop_first=True)

# ----------------------------
# Train/Test Split
# ----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y   # ensures class balance
)

# ----------------------------
# Model
# ----------------------------
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=12,
    random_state=42,
    n_jobs=-1,
    class_weight="balanced"
)


model.fit(X_train, y_train)

# ----------------------------
# Evaluation
# ----------------------------
y_pred = model.predict(X_test)

print("\nModel Evaluation Results")
print("------------------------")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

# ----------------------------
# Save Model
# ----------------------------
os.makedirs("models", exist_ok=True)

joblib.dump(model, "models/recommender_model.pkl")

print("\nModel trained and saved successfully.")

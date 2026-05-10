import numpy as np

def model_predict(X):
    results = []
    for row in X:
        similarity = row[0]   # Product similarity score
        purchase_prob = row[1]  # Purchase probability score
        service_boost = row[2]     # Location-based score (e.g., nearby service center)

        # Calculate final recommendation score by summing all feature scores
        score = (similarity * 0.7) + (purchase_prob * 0.2) + service_boost
        results.append(score)

    return np.array(results)

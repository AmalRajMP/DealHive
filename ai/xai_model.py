import numpy as np

def model_predict(X):
    results = []
    for row in X:
        similarity = row[0]   # Product similarity score
        interaction = row[1]  # User interaction / preference score
        location = row[2]     # Location-based score (e.g., nearby service center)

        # Calculate final recommendation score by summing all feature scores
        score = similarity + interaction + location
        results.append(score)

    return np.array(results)

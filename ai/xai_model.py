import numpy as np

def model_predict(X):
    results = []
    for row in X:
        similarity = row[0]
        interaction = row[1]
        location = row[2]

        score = similarity + interaction + location
        results.append(score)

    return np.array(results)

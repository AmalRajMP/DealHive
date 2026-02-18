import shap
import numpy as np
from xai_model import model_predict
import matplotlib.pyplot as plt

background = np.array([
    [0,0,0],
    [0.5,0.2,0.1],
    [1,1,1]
])

explainer = shap.Explainer(model_predict, background)

sample = np.array([[0.8, 0.4, 1]])

shap_values = explainer(sample)

# feature names
shap_values.feature_names = ["similarity", "interaction", "location"]

# show waterfall plot
shap.plots.waterfall(shap_values[0])

plt.show()

import React, { useState } from "react";

export default function PurchasePredictionFrontend() {

  const [formData, setFormData] = useState({
    timeSpent: "",
    pagesViewed: "",
    cartValue: "",
    purchaseFrequency: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePredict = () => {
    const score =
      Number(formData.cartValue) +
      Number(formData.timeSpent) +
      Number(formData.pagesViewed);

    if (score > 100) {
      setPrediction("Purchased");
      setConfidence(78);
    } else {
      setPrediction("Not Purchased");
      setConfidence(42);
    }
  };

  const handleReset = () => {
    setFormData({
      timeSpent: "",
      pagesViewed: "",
      cartValue: "",
      purchaseFrequency: ""
    });

    setPrediction(null);
    setConfidence(0);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Customer Purchase Prediction</h1>

      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          name="timeSpent"
          placeholder="Time Spent"
          value={formData.timeSpent}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="pagesViewed"
          placeholder="Pages Viewed"
          value={formData.pagesViewed}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="cartValue"
          placeholder="Cart Value"
          value={formData.cartValue}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="purchaseFrequency"
          placeholder="Purchase Frequency"
          value={formData.purchaseFrequency}
          onChange={handleChange}
        />

        <br /><br />

        <button onClick={handlePredict}>Predict</button>
        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Prediction Result</h2>

        <p>Status: {prediction || "No Prediction"}</p>
        <p>Confidence: {confidence}%</p>
      </div>
    </div>
  );
}
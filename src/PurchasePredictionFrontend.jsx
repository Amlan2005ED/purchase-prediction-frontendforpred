import React, { useState } from "react";

export default function PurchasePredictionFrontend() {

  const [prediction, setPrediction] = useState("No Prediction");
  const [confidence, setConfidence] = useState(0);

  const steps = [
    "Generate / Load Data",
    "Clean Missing Values",
    "Remove Outliers",
    "Engineer Features",
    "Train Random Forest",
    "Predict Result"
  ];

  const handlePredict = async () => {
    const response = await fetch("https://purchase-prediction-backend.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        time_spent: 12,
        pages_viewed: 6,
        cart_value: 2500,
        purchase_frequency: 3
      })
    });

    const data = await response.json();
    setPrediction(data.prediction);
    setConfidence(Math.round(data.confidence * 100));
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f172a,#0ea5e9)",
      padding: "40px",
      fontFamily: "Segoe UI"
    }}>

      <div style={{maxWidth:"1200px",margin:"auto"}}>

        {/* HEADER */}
        <div style={{
          background:"white",
          padding:"30px",
          borderRadius:"16px",
          marginBottom:"25px",
          boxShadow:"0 10px 30px rgba(0,0,0,0.2)"
        }}>
          <h1 style={{margin:0,color:"#0f172a"}}>
            Customer Purchase Prediction Dashboard
          </h1>
          <p style={{color:"#64748b"}}>
            AI powered prediction using Random Forest model
          </p>
        </div>

        {/* WORKFLOW */}
        <div style={{
          background:"white",
          padding:"25px",
          borderRadius:"16px",
          marginBottom:"25px",
          boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
        }}>

          <h2>Workflow</h2>

          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
            gap:"15px",
            marginTop:"15px"
          }}>

            {steps.map((step,index)=>(
              <div key={index} style={{
                background:"#f1f5f9",
                padding:"15px",
                borderRadius:"12px",
                textAlign:"center"
              }}>
                <div style={{
                  background:"#0ea5e9",
                  color:"white",
                  width:"35px",
                  height:"35px",
                  borderRadius:"50%",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center",
                  margin:"auto"
                }}>
                  {index+1}
                </div>

                <p style={{marginTop:"10px"}}>{step}</p>
              </div>
            ))}

          </div>
        </div>

        {/* PREDICTION AREA */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"2fr 1fr",
          gap:"20px"
        }}>

          {/* INPUT FORM */}
          <div style={{
            background:"white",
            padding:"25px",
            borderRadius:"16px",
            boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
          }}>

            <h2>Prediction Input</h2>

            <div style={{marginTop:"15px"}}>

              <input
                placeholder="Time Spent"
                style={inputStyle}
              />

              <input
                placeholder="Pages Viewed"
                style={inputStyle}
              />

              <input
                placeholder="Cart Value"
                style={inputStyle}
              />

              <input
                placeholder="Purchase Frequency"
                style={inputStyle}
              />

            </div>

            <button onClick={handlePredict} style={buttonStyle}>
              Run Prediction
            </button>

          </div>

          {/* RESULT */}
          <div style={{
            background:"white",
            padding:"25px",
            borderRadius:"16px",
            boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
          }}>

            <h2>Prediction Result</h2>

            <h1 style={{
              color:"#0ea5e9",
              marginTop:"20px"
            }}>
              {prediction}
            </h1>

            <p>Confidence</p>

            <div style={{
              height:"10px",
              background:"#e2e8f0",
              borderRadius:"5px",
              overflow:"hidden"
            }}>
              <div style={{
                width:`${confidence}%`,
                height:"100%",
                background:"#0ea5e9"
              }}></div>
            </div>

            <p style={{marginTop:"10px"}}>{confidence}%</p>

          </div>

        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width:"100%",
  padding:"12px",
  marginBottom:"10px",
  borderRadius:"8px",
  border:"1px solid #cbd5f5"
}

const buttonStyle = {
  marginTop:"10px",
  padding:"12px 20px",
  background:"#0ea5e9",
  color:"white",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer"
}

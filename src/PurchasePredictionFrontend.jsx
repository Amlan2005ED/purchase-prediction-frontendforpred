import React, { useState } from "react";

export default function PurchasePredictionFrontend() {

  const [timeSpent, setTimeSpent] = useState("");
  const [pagesViewed, setPagesViewed] = useState("");
  const [cartValue, setCartValue] = useState("");
  const [purchaseFrequency, setPurchaseFrequency] = useState("");

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

    if(!timeSpent || !pagesViewed || !cartValue || !purchaseFrequency){
      alert("Please fill all input fields.");
      return;
    }

    try {

      const response = await fetch(
        "https://purchase-prediction-backend.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            time_spent: Number(timeSpent),
            pages_viewed: Number(pagesViewed),
            cart_value: Number(cartValue),
            purchase_frequency: Number(purchaseFrequency)
          })
        }
      );

      const data = await response.json();

      setPrediction(data.prediction);
      setConfidence(Math.round(data.confidence * 100));

    } catch (error) {
      console.error(error);
      alert("Prediction failed. Backend may be sleeping (Render free tier). Try again.");
    }

  };

  return (
    <div style={pageStyle}>

      <div style={{maxWidth:"1200px",margin:"auto"}}>

        {/* HEADER */}
        <div style={headerCard}>
          <h1 style={{margin:0}}>Customer Purchase Prediction</h1>
          <p style={{color:"#64748b"}}>
            AI powered prediction using Random Forest model
          </p>
        </div>

        {/* WORKFLOW */}
        <div style={card}>
          <h2>Workflow</h2>

          <div style={workflowGrid}>

            {steps.map((step,index)=>(
              <div key={index} style={workflowCard}>
                <div style={circle}>{index+1}</div>
                <p>{step}</p>
              </div>
            ))}

          </div>
        </div>

        {/* MAIN DASHBOARD */}
        <div style={dashboardGrid}>

          {/* INPUT FORM */}
          <div style={card}>

            <h2>Prediction Input</h2>

            <input
              placeholder="Time Spent"
              value={timeSpent}
              onChange={(e)=>setTimeSpent(e.target.value)}
              style={input}
            />

            <input
              placeholder="Pages Viewed"
              value={pagesViewed}
              onChange={(e)=>setPagesViewed(e.target.value)}
              style={input}
            />

            <input
              placeholder="Cart Value"
              value={cartValue}
              onChange={(e)=>setCartValue(e.target.value)}
              style={input}
            />

            <input
              placeholder="Purchase Frequency"
              value={purchaseFrequency}
              onChange={(e)=>setPurchaseFrequency(e.target.value)}
              style={input}
            />

            <button onClick={handlePredict} style={button}>
              Run Prediction
            </button>

          </div>

          {/* RESULT CARD */}
          <div style={card}>

            <h2>Prediction Result</h2>

            <h1 style={{color:"#0ea5e9"}}>
              {prediction}
            </h1>

            <p>Confidence</p>

            <div style={progressBackground}>
              <div
                style={{
                  ...progressBar,
                  width:`${confidence}%`
                }}
              />
            </div>

            <p>{confidence}%</p>

          </div>

        </div>

      </div>

    </div>
  );
}

/* ---------- STYLES ---------- */

const pageStyle = {
  minHeight:"100vh",
  padding:"40px",
  background:"linear-gradient(135deg,#0f172a,#0ea5e9)",
  fontFamily:"Segoe UI"
};

const headerCard = {
  background:"white",
  padding:"30px",
  borderRadius:"16px",
  marginBottom:"25px",
  boxShadow:"0 10px 30px rgba(0,0,0,0.2)"
};

const card = {
  background:"white",
  padding:"25px",
  borderRadius:"16px",
  marginBottom:"25px",
  boxShadow:"0 10px 25px rgba(0,0,0,0.15)"
};

const workflowGrid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
  gap:"15px",
  marginTop:"15px"
};

const workflowCard = {
  background:"#f1f5f9",
  padding:"15px",
  borderRadius:"12px",
  textAlign:"center"
};

const circle = {
  background:"#0ea5e9",
  color:"white",
  width:"35px",
  height:"35px",
  borderRadius:"50%",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  margin:"auto"
};

const dashboardGrid = {
  display:"grid",
  gridTemplateColumns:"2fr 1fr",
  gap:"20px"
};

const input = {
  width:"100%",
  padding:"12px",
  marginBottom:"10px",
  borderRadius:"8px",
  border:"1px solid #cbd5f5"
};

const button = {
  marginTop:"10px",
  padding:"12px",
  width:"100%",
  background:"#0ea5e9",
  color:"white",
  border:"none",
  borderRadius:"8px",
  cursor:"pointer",
  fontWeight:"bold"
};

const progressBackground = {
  height:"10px",
  background:"#e2e8f0",
  borderRadius:"5px",
  overflow:"hidden"
};

const progressBar = {
  height:"100%",
  background:"#0ea5e9"
};

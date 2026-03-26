import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
} from "chart.js";

import { Bar, Pie, Scatter } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

export default function PurchasePredictionFrontend() {

  const [timeSpent,setTimeSpent]=useState("");
  const [pagesViewed,setPagesViewed]=useState("");
  const [cartValue,setCartValue]=useState("");
  const [purchaseFrequency,setPurchaseFrequency]=useState("");

  const [prediction,setPrediction]=useState("No Prediction");
  const [confidence,setConfidence]=useState(0);

  const handlePredict = async () => {

    try{

      const response = await fetch(
        "https://purchase-prediction-backend.onrender.com/predict",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            time_spent:Number(timeSpent),
            pages_viewed:Number(pagesViewed),
            cart_value:Number(cartValue),
            purchase_frequency:Number(purchaseFrequency)
          })
        }
      );

      const data = await response.json();

      setPrediction(data.prediction);
      setConfidence(Math.round(data.confidence*100));

    }catch(e){
      alert("Backend may be sleeping. Try again.");
    }
  };

  /* ----------- GRAPH DATA ----------- */

  const purchaseChart = {
    labels:["Purchased","Not Purchased"],
    datasets:[{
      data:[120,130],
      backgroundColor:["#22c55e","#ef4444"]
    }]
  };

  const timeChart = {
    labels:["0-5","5-10","10-15","15-20","20+"],
    datasets:[{
      label:"Users",
      data:[10,40,80,60,20],
      backgroundColor:"#3b82f6"
    }]
  };

  const cartChart = {
    labels:["0-1000","1000-3000","3000-5000","5000+"],
    datasets:[{
      label:"Cart Distribution",
      data:[20,80,60,30],
      backgroundColor:"#8b5cf6"
    }]
  };

  const scatterData = {
    datasets:[{
      label:"Pages vs Cart Value",
      data:[
        {x:5,y:2000},
        {x:10,y:3500},
        {x:7,y:1800},
        {x:12,y:4200}
      ],
      backgroundColor:"#f97316"
    }]
  };

  const featureImportance = {
    labels:[
      "Time Spent",
      "Pages Viewed",
      "Cart Value",
      "Purchase Frequency",
      "Avg Cart",
      "Cart Log",
      "Time Bin"
    ],
    datasets:[{
      label:"Importance",
      data:[0.20,0.12,0.18,0.25,0.10,0.08,0.07],
      backgroundColor:"#0ea5e9"
    }]
  };

  return (

    <div style={page}>

      {/* HEADER */}

      <div style={header}>
        <h1>AI Purchase Prediction Dashboard</h1>
        <p>Machine Learning powered customer purchase prediction</p>
      </div>


      {/* METRICS */}

      <div style={metricsGrid}>

        <div style={metricCard}>
          <h3>Dataset</h3>
          <p>250 Records</p>
        </div>

        <div style={metricCard}>
          <h3>Features</h3>
          <p>7 Variables</p>
        </div>

        <div style={metricCard}>
          <h3>Model</h3>
          <p>Random Forest</p>
        </div>

        <div style={metricCard}>
          <h3>Charts</h3>
          <p>5 Analytics</p>
        </div>

      </div>


      {/* INPUT + RESULT */}

      <div style={mainGrid}>

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

        <div style={card}>

          <h2>Prediction Result</h2>

          <h1 style={{color:"#3b82f6"}}>
            {prediction}
          </h1>

          <p>Confidence</p>

          <div style={progressBg}>
            <div style={{
              ...progressBar,
              width:`${confidence}%`
            }}/>
          </div>

          <p>{confidence}%</p>

        </div>

      </div>


      {/* GRAPHS */}

      <div style={chartsGrid}>

        <div style={chartCard}>
          <h3>Purchase Distribution</h3>
          <Pie data={purchaseChart}/>
        </div>

        <div style={chartCard}>
          <h3>Time Spent Distribution</h3>
          <Bar data={timeChart}/>
        </div>

        <div style={chartCard}>
          <h3>Cart Value Distribution</h3>
          <Bar data={cartChart}/>
        </div>

        <div style={chartCard}>
          <h3>Pages vs Cart Value</h3>
          <Scatter data={scatterData}/>
        </div>

        <div style={chartCard}>
          <h3>Feature Importance</h3>
          <Bar data={featureImportance}/>
        </div>

      </div>

    </div>
  );
}


/* ---------- STYLES ---------- */

const page={
  minHeight:"100vh",
  padding:"40px",
  background:"linear-gradient(135deg,#0f172a,#2563eb)",
  fontFamily:"Segoe UI"
};

const header={
  textAlign:"center",
  color:"white",
  marginBottom:"30px"
};

const metricsGrid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
  gap:"20px",
  marginBottom:"30px"
};

const metricCard={
  background:"white",
  padding:"20px",
  borderRadius:"10px",
  textAlign:"center"
};

const mainGrid={
  display:"grid",
  gridTemplateColumns:"2fr 1fr",
  gap:"20px",
  marginBottom:"30px"
};

const chartsGrid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",
  gap:"20px"
};

const card={
  background:"white",
  padding:"25px",
  borderRadius:"12px"
};

const chartCard={
  background:"white",
  padding:"20px",
  borderRadius:"12px"
};

const input={
  width:"100%",
  padding:"12px",
  marginBottom:"10px"
};

const button={
  width:"100%",
  padding:"12px",
  background:"#3b82f6",
  color:"white",
  border:"none",
  borderRadius:"6px",
  cursor:"pointer"
};

const progressBg={
  height:"10px",
  background:"#e2e8f0",
  borderRadius:"6px",
  overflow:"hidden"
};

const progressBar={
  height:"100%",
  background:"#22c55e"
};

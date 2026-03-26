import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement
} from "chart.js";

import { Bar, Pie, Scatter } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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


  /* ---------------- GRAPHS ---------------- */

  const purchaseChart = {
    labels:["Purchased","Not Purchased"],
    datasets:[
      {
        label:"Customers",
        data:[120,130],
        backgroundColor:["#0ea5e9","#64748b"]
      }
    ]
  };

  const timeSpentChart = {
    labels:["0-5","5-10","10-15","15-20","20+"],
    datasets:[
      {
        label:"Users",
        data:[15,40,80,60,20],
        backgroundColor:"#0ea5e9"
      }
    ]
  };

  const cartValueChart = {
    labels:["0-1000","1000-3000","3000-5000","5000+"],
    datasets:[
      {
        label:"Cart Value Distribution",
        data:[40,100,60,20],
        backgroundColor:"#22c55e"
      }
    ]
  };

  const scatterData = {
    datasets:[
      {
        label:"Pages vs Cart Value",
        data:[
          {x:5,y:2000},
          {x:10,y:3500},
          {x:7,y:1800},
          {x:12,y:4200}
        ],
        backgroundColor:"#f97316"
      }
    ]
  };

  const featureImportance = {
    labels:[
      "Time Spent",
      "Pages Viewed",
      "Cart Value",
      "Purchase Frequency",
      "Average Cart",
      "Cart Log",
      "Time Bin"
    ],
    datasets:[
      {
        label:"Importance",
        data:[0.20,0.12,0.18,0.25,0.10,0.08,0.07],
        backgroundColor:"#8b5cf6"
      }
    ]
  };


  return (

    <div style={page}>

      <h1 style={{color:"white"}}>Purchase Prediction Dashboard</h1>

      {/* INPUT CARD */}

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

        <p>Confidence {confidence}%</p>

      </div>


      {/* GRAPHS */}

      <div style={grid}>

        <div style={chartCard}>
          <h3>Purchase Status Distribution</h3>
          <Pie data={purchaseChart}/>
        </div>

        <div style={chartCard}>
          <h3>Time Spent Distribution</h3>
          <Bar data={timeSpentChart}/>
        </div>

        <div style={chartCard}>
          <h3>Cart Value Distribution</h3>
          <Bar data={cartValueChart}/>
        </div>

        <div style={chartCard}>
          <h3>Pages Viewed vs Cart Value</h3>
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
  background:"linear-gradient(135deg,#0f172a,#0ea5e9)",
  padding:"40px",
  fontFamily:"Segoe UI"
};

const card={
  background:"white",
  padding:"20px",
  borderRadius:"12px",
  marginBottom:"20px"
};

const chartCard={
  background:"white",
  padding:"20px",
  borderRadius:"12px"
};

const grid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
  gap:"20px"
};

const input={
  display:"block",
  width:"100%",
  marginBottom:"10px",
  padding:"10px"
};

const button={
  background:"#0ea5e9",
  color:"white",
  border:"none",
  padding:"12px",
  width:"100%",
  borderRadius:"6px",
  cursor:"pointer"
};

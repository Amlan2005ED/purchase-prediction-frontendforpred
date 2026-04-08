import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
} from "chart.js";

import { Bar, Pie, Scatter, Doughnut } from "react-chartjs-2";

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
  const [loading,setLoading]=useState(false);

  const handlePredict = async () => {

    setLoading(true);

    try{
      const API_URL = import.meta.env.VITE_API_URL;
      console.log("API URL:", import.meta.env.VITE_API_URL);

      console.log("API URL:", API_URL); // debug (remove later)

      const response = await fetch(
        `${API_URL}/predict`,
        {
          method:"POST",
          headers:{ "Content-Type":"application/json" },
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
      console.error("ERROR:", e);
      alert("Something went wrong. Check console.");
    }


    setLoading(false);
  };

  const purchaseChart = {
    labels:["Purchased","Not Purchased"],
    datasets:[{
      data:[120,130],
      backgroundColor:["#22c55e","#ef4444"]
    }]
  };

  const featureImportance = {
    labels:["Time","Pages","Cart","Frequency","Avg","Log","Bin"],
    datasets:[{
      data:[0.20,0.12,0.18,0.25,0.10,0.08,0.07],
      backgroundColor:"#f97316"
    }]
  };

  const scatterData = {
    datasets:[{
      data:[
        {x:5,y:2000},
        {x:10,y:3500},
        {x:7,y:1800},
        {x:12,y:4200}
      ],
      backgroundColor:"#fb923c"
    }]
  };

  const confusionMatrix = {
    labels:["Pred No","Pred Yes"],
    datasets:[
      { label:"Actual No", data:[45,10], backgroundColor:"#ef4444" },
      { label:"Actual Yes", data:[8,37], backgroundColor:"#22c55e" }
    ]
  };

  const accuracyGauge = {
    labels:["Accuracy","Remaining"],
    datasets:[{
      data:[92,8],
      backgroundColor:["#f97316","#e5e7eb"]
    }]
  };

  const correlationData = {
    labels:["Time","Pages","Cart","Freq"],
    datasets:[{
      data:[0.72,0.55,0.81,0.66],
      backgroundColor:"#fb923c"
    }]
  };

  return (

    <div style={layout}>

      {/* SIDEBAR */}
      <div style={sidebar}>
        <h2>AI Dashboard</h2>
        <p>Overview</p>
        <p>Prediction</p>
        <p>Analytics</p>
        <p>Metrics</p>
      </div>

      {/* MAIN */}
      <div style={mainContent}>

        <h1 style={{marginBottom:"20px"}}>Customer Purchase Prediction</h1>

        {/* METRICS */}
        <div style={grid4}>
          <div style={card}><h3>Dataset</h3><p>250 Rows</p></div>
          <div style={card}><h3>Features</h3><p>7</p></div>
          <div style={card}><h3>Model</h3><p>Random Forest</p></div>
          <div style={card}><h3>Accuracy</h3><p>92%</p></div>
        </div>

        {/* INPUT + RESULT */}
        <div style={mainGrid}>

          <div style={card}>
            <h2>Prediction Input</h2>

            <input placeholder="Time Spent" value={timeSpent} onChange={(e)=>setTimeSpent(e.target.value)} style={input}/>
            <input placeholder="Pages Viewed" value={pagesViewed} onChange={(e)=>setPagesViewed(e.target.value)} style={input}/>
            <input placeholder="Cart Value" value={cartValue} onChange={(e)=>setCartValue(e.target.value)} style={input}/>
            <input placeholder="Purchase Frequency" value={purchaseFrequency} onChange={(e)=>setPurchaseFrequency(e.target.value)} style={input}/>

            <button onClick={handlePredict} style={button}>
              {loading ? "Running..." : "Run Prediction"}
            </button>
          </div>

          <div style={card}>
            <h2>Prediction Result</h2>

            <h1 style={{color:"#f97316"}}>{prediction}</h1>

            <div style={progressBg}>
              <div style={{...progressBar,width:`${confidence}%`}}/>
            </div>

            <p>{confidence}%</p>
          </div>

        </div>

        {/* CHARTS */}
        <div style={chartsGrid}>

          <div style={card}><h3>Purchase</h3><Pie data={purchaseChart}/></div>
          <div style={card}><h3>Importance</h3><Bar data={featureImportance}/></div>
          <div style={card}><h3>Scatter</h3><Scatter data={scatterData}/></div>
          <div style={card}><h3>Confusion</h3><Bar data={confusionMatrix}/></div>
          <div style={card}><h3>Accuracy</h3><Doughnut data={accuracyGauge}/></div>
          <div style={card}><h3>Correlation</h3><Bar data={correlationData}/></div>

        </div>

      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const layout={
  display:"flex",
  minHeight:"100vh",
  background:"#fdf6ec"
};

const sidebar={
  width:"220px",
  background:"#fed7aa",
  padding:"30px",
  color:"#7c2d12"
};

const mainContent={
  flex:1,
  padding:"40px",
  color:"#3f3f46"
};

const grid4={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
  gap:"20px",
  marginBottom:"30px"
};

const mainGrid={
  display:"grid",
  gridTemplateColumns:"2fr 1fr",
  gap:"20px",
  marginBottom:"30px"
};

const chartsGrid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
  gap:"20px"
};

const card={
  background:"#fffaf3",
  padding:"20px",
  borderRadius:"12px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.05)"
};

const input={
  width:"100%",
  padding:"10px",
  marginBottom:"10px",
  borderRadius:"6px",
  border:"1px solid #e5e7eb"
};

const button={
  width:"100%",
  padding:"12px",
  background:"#f97316",
  color:"white",
  border:"none",
  borderRadius:"6px"
};

const progressBg={
  height:"10px",
  background:"#e5e7eb",
  borderRadius:"6px"
};

const progressBar={
  height:"100%",
  background:"#fb923c"
};

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
      alert("Backend waking up. Try again.");
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
      backgroundColor:"#3b82f6"
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

  const confusionMatrix = {
    labels:["Pred No","Pred Yes"],
    datasets:[
      {
        label:"Actual No",
        data:[45,10],
        backgroundColor:"#ef4444"
      },
      {
        label:"Actual Yes",
        data:[8,37],
        backgroundColor:"#22c55e"
      }
    ]
  };

  const accuracyGauge = {
    labels:["Accuracy","Remaining"],
    datasets:[
      {
        data:[92,8],
        backgroundColor:["#22c55e","#1e293b"]
      }
    ]
  };

  const correlationData = {
    labels:["Time","Pages","Cart","Frequency"],
    datasets:[
      {
        label:"Correlation",
        data:[0.72,0.55,0.81,0.66],
        backgroundColor:"#14b8a6"
      }
    ]
  };

  return (

    <div style={layout}>

      <div style={sidebar}>

        <h2>AI Dashboard</h2>

        <p>Overview</p>
        <p>Prediction</p>
        <p>Analytics</p>
        <p>Model Metrics</p>

      </div>

      <div style={mainContent}>

        <div style={header}>
          <h1>Customer Purchase Prediction</h1>
        </div>

        <div style={metricsGrid}>

          <div style={metricCard}>
            <h3>Dataset</h3>
            <p>250 Rows</p>
          </div>

          <div style={metricCard}>
            <h3>Features</h3>
            <p>7</p>
          </div>

          <div style={metricCard}>
            <h3>Model</h3>
            <p>Random Forest</p>
          </div>

          <div style={metricCard}>
            <h3>Accuracy</h3>
            <p>92%</p>
          </div>

        </div>

        <div style={statsGrid}>

          <div style={statCard}>
            <h3>Avg Time Spent</h3>
            <p>12.4</p>
          </div>

          <div style={statCard}>
            <h3>Avg Pages Viewed</h3>
            <p>8.1</p>
          </div>

          <div style={statCard}>
            <h3>Avg Cart Value</h3>
            <p>$2475</p>
          </div>

          <div style={statCard}>
            <h3>Purchase Frequency</h3>
            <p>3.2</p>
          </div>

        </div>

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
              {loading ? "Running Model..." : "Run Prediction"}
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

        <div style={card}>

          <h2>Model Training Summary</h2>

          <ul>
          <li>Missing values handled using median</li>
          <li>Outliers removed using IQR</li>
          <li>Feature engineering applied</li>
          <li>Random Forest optimized with GridSearchCV</li>
          <li>Training / Testing split 80/20</li>
          <li>Resampling used to balance classes</li>
          </ul>

        </div>

        <div style={chartsGrid}>

          <div style={chartCard}>
            <h3>Purchase Distribution</h3>
            <Pie data={purchaseChart}/>
          </div>

          <div style={chartCard}>
            <h3>Feature Importance</h3>
            <Bar data={featureImportance}/>
          </div>

          <div style={chartCard}>
            <h3>Pages vs Cart Value</h3>
            <Scatter data={scatterData}/>
          </div>

          <div style={chartCard}>
            <h3>Confusion Matrix</h3>
            <Bar data={confusionMatrix}/>
          </div>

          <div style={chartCard}>
            <h3>Model Accuracy</h3>
            <Doughnut data={accuracyGauge}/>
          </div>

          <div style={chartCard}>
            <h3>Feature Correlation</h3>
            <Bar data={correlationData}/>
          </div>

        </div>

      </div>

    </div>
  );
}

const layout={display:"flex",minHeight:"100vh",fontFamily:"Segoe UI",background:"#0f172a"};
const sidebar={width:"220px",background:"#020617",color:"white",padding:"30px"};
const mainContent={flex:1,padding:"40px",color:"white"};
const header={marginBottom:"30px"};

const metricsGrid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:"20px",
marginBottom:"30px"
};

const metricCard={background:"#1e293b",padding:"20px",borderRadius:"10px"};

const statsGrid={
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",
gap:"20px",
marginBottom:"30px"
};

const statCard={background:"#1e293b",padding:"20px",borderRadius:"10px",textAlign:"center"};

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

const card={background:"#1e293b",padding:"25px",borderRadius:"10px"};
const chartCard={background:"#1e293b",padding:"20px",borderRadius:"10px"};

const input={width:"100%",padding:"12px",marginBottom:"10px"};

const button={
width:"100%",
padding:"12px",
background:"#3b82f6",
border:"none",
color:"white",
borderRadius:"6px"
};

const progressBg={height:"10px",background:"#334155",borderRadius:"6px",overflow:"hidden"};
const progressBar={height:"100%",background:"#22c55e"};

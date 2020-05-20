import React from "react";

import "./settings.css";

export default function Settings(props) {
  const testConfig = {
    seconds: 5,
    renderStepProgressms: 50,
  };

  return (
    <div className="Settings">
      <h1>Setup your Stress Test</h1>   
      <button onClick={() => props.startTest(testConfig)}>Start</button> 
    </div>
  );
}

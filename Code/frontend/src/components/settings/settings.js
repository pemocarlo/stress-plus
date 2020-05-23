import React from "react";

import "./settings.css";

export default function Settings(props) {
  const testConfig = {
    answerTimeout: 5, //in seconds
    waitTime: 1, // in seconds
  };

  return (
    <div className="Settings">
      <h1>Setup your Stress Test</h1>   
      <button onClick={() => props.startTest(testConfig)}>Start</button>
    </div>
  );
}

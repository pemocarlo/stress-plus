import React, {useState} from "react";

import "./settings.css";

const defaultTestConfig = {
  answerTimeout: 5, //in seconds
  waitTime: 1, // in seconds
  enableSound: false,
};

export default function Settings(props) {
  const [testConfig, setTestConfig] = useState(defaultTestConfig);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setTestConfig({...testConfig, [name]: value});
  }

  return (
    <div className="Settings">
      <h1>Setup your Stress Test</h1>   
      <div>
        <span>Enable sound</span>
        <input type="checkbox" name='enableSound' checked={testConfig.enableSound} onChange={handleInputChange}/>
      </div>
      <button onClick={() => props.startTest(testConfig)}>Start</button>
    </div>
  );
}

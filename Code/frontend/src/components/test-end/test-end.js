import React from "react";
import {useHistory} from "react-router-dom";

import "./test-end.css";

export default function TestEnd() {
  const history = useHistory();
  return (
    <div className="TestEnd">
      <div className="message">Test Finished!</div>
      <div className="buttonSettings">
        <button onClick={() => history.push("/")}>Back to Settings</button>
      </div>
    </div>
  );
}

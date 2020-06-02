import React from "react";

export default function MessageComponent(props) {
  const {settings, onFinished} = props;
  return (
    <div className="message-component">
      <div className="message">Message: {settings.title}</div>
      <div className="button">
        <button onClick={onFinished}>Next</button>
      </div>
    </div>
  );
}

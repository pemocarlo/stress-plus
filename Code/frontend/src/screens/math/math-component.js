import React from "react";

export default function MathComponent(props) {
  const {settings, onFinished} = props;
  return (
    <div className="math-component">
      <div className="message">Math: {settings.title}</div>
      <div className="button">
        <button onClick={onFinished}>Next</button>
      </div>
    </div>
  );
}

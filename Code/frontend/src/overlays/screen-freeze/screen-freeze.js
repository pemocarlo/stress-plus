import React, {useEffect, useState} from "react";

import "./screen-freeze.scss";

export default function ScreenFreeze(props) {
  const [showLoading, setShowLoading] = useState(false);

  const [timeToStart] = useState(props.freezeStart);
  const [timeDisplay] = useState(props.freezeDisplay);

  useEffect(() => {
    const start = setTimeout(() => setShowLoading(true), timeToStart * 1000);
    return () => clearTimeout(start);
  }, [timeToStart]);

  useEffect(() => {
    const display = setTimeout(() => setShowLoading(false), (timeToStart + timeDisplay) * 1000);
    return () => {
      clearTimeout(display);
    };
  }, [timeToStart, timeDisplay]);

  return showLoading && <div className="freeze"></div>;
}

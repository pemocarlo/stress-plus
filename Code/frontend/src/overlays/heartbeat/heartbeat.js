import React, {useState, useEffect} from "react";
//import {useTranslation} from "react-i18next";
import "./heartbeat.scss";

export default function Heartbeat(props) {
  const [timeToStart] = useState(props.heartbeatStart);
  const [showLoading, setShowLoading] = useState(false);
  const [counter, setCounter] = useState(70);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const start = setTimeout(() => setShowLoading(true), timeToStart * 1000);
    return () => clearTimeout(start);
  }, [timeToStart]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter < 100) {
        const rand = getRandomInt(0, 5);
        setCounter(counter + rand);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  return (
    showLoading && (
      <div className="Heartbeat">
        <div className="heart"></div>
        <div className="pulse">{counter}</div>
      </div>
    )
  );
}

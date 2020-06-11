import React, {useState, useEffect} from "react";

function getCurrentTimeString() {
  return new Date().toLocaleTimeString();
}

export default function CurrentTime() {
  const [time, setTime] = useState(getCurrentTimeString());

  useEffect(() => {
    const id = setInterval(() => setTime(getCurrentTimeString()), 500);
    return () => clearInterval(id);
  }, []);

  return <div className="h2 p-3">{time}</div>;
}

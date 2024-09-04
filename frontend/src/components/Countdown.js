"use client";
import React, { useState, useEffect,useRef} from 'react';

export default function Countdown() {
    const [counter, setCounter] = useState(99);  
    // Update countdown value
    const countdownRef = useRef(null);

    useEffect(() => {
        if (countdownRef.current) {
          const validValue = Math.max(0, Math.min(99, counter));
          countdownRef.current.style.setProperty('--value', validValue);
        }
      }, [counter]);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCounter(prevCounter => (prevCounter > 0 ? prevCounter - 1 : 0));
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl">
        <span style={{ "--value": 61 }}></span>
      </span>
      days
    </div>
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl">
        <span style={{ "--value": 21 }}></span>
      </span>
      hours
    </div>
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl">
        <span style={{ "--value": 24 }}></span>
      </span>
      min
    </div>
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl" ref={countdownRef}>
        <span></span>
      </span>
      sec
    </div>
  </div>
  )
}

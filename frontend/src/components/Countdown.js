"use client";
import React, { useState, useEffect,useRef} from 'react';

export default function Countdown() {
    const [counter, setCounter] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
    // Update countdown value
    const countdownRef = useRef(null);
    const electionDate = new Date("2024-11-05T00:00:00");

    useEffect(() => {
      function calcCounter() {
        const now = new Date();
        const difference = electionDate - now;
        console.log(difference);

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((difference / 1000 / 60) % 60);
          const seconds = Math.floor((difference / 1000) % 60);

          setCounter({days, hours, minutes, seconds});
        } else {
          setCounter({days: 0, hours: 0, minutes: 0, seconds: 0})
        }
      }

        if (countdownRef.current) {
          const validValue = Math.max(0, Math.min(99, counter));
          countdownRef.current.style.setProperty('--value', validValue);
        }

        const interval = setInterval(() => {
          calcCounter();
        }, 1000);
    
        return () => clearInterval(interval);
      }, [electionDate]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl">
        <span style={{ "--value": counter.days }}></span>
      </span>
      days
    </div>
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl">
        <span style={{ "--value": counter.hours }}></span>
      </span>
      hours
    </div>
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl">
        <span style={{ "--value": counter.minutes }}></span>
      </span>
      min
    </div>
    <div className="flex flex-col">
      <span className="countdown font-mono text-5xl" ref={countdownRef}>
        <span style={{ "--value": counter.seconds }}>{counter.seconds}</span>
      </span>
      sec
    </div>
  </div>
  )
}

import {useEffect, useState} from "react";
import "./BreathTimer.css";

export type props = {
  in_time: number,
  in_hold:number,
  out_time: number,
  out_hold: number
};

type BreathState = "in" | "in_hold" | "out" | "out_hold";
type StateConfig = {
  [key in BreathState]: { duration: number; next_state: BreathState; };
};

function BreathLabel({state}: {state: BreathState}) {
  let labelText = "";
  switch (state) {
    case "in":
      labelText = "Breath In";
      break;
    case "out":
      labelText = "Breath Out";
      break;
    case "in_hold":
    case "out_hold":
      labelText = "Hold";
      break;
  }
  return <span>{labelText}</span>
}

function circleRadiusRatio(runningFor: number, states: StateConfig, state: BreathState) {
  switch (state) {
    case "in":
      return 0.3 + 0.7 * runningFor / states[state].duration;
    case "out":
      return 1 - 0.7 * runningFor / states[state].duration;
    case "in_hold":
      return 1;
    case "out_hold":
      return 0.3;
  }
}

function circleColour(runningFor: number, states: StateConfig, state: BreathState) {
  const ratio = runningFor / states[state].duration;
  let colour_one = 200 - 130 * ratio;
  let colour_two = 70 + 130 * ratio;
  switch (state) {
    case "in":
      return `rgb(${colour_one}, 85, ${colour_two})`
    case "in_hold":
      return "rgb(70, 85, 200)"
    case "out":
      return `rgb(${colour_two}, 85, ${colour_one})`
    case "out_hold":
      return "rgb(200, 85, 70)"
  }
}

export default function BreathTimer({in_time, out_time, in_hold, out_hold}: props) {
  const states: StateConfig = {
    in: {duration: in_time, next_state: "in_hold"},
    in_hold: {duration: in_hold, next_state: "out"},
    out: {duration: out_time, next_state: "out_hold"},
    out_hold: {duration: out_hold, next_state: "in"}
  };

  const [startedAt, setStartedAt] = useState(Date.now());
  const [runningFor, setRunningFor] = useState(0);
  const [currentBreathState, setCurrentBreathState] = useState<BreathState>("in");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = (now - startedAt) / 1000;
      const overtime = elapsedSeconds - states[currentBreathState].duration;
      if (overtime >= 0) {
        setRunningFor(overtime);
        setStartedAt(now);
        setCurrentBreathState(states[currentBreathState].next_state);
      } else {
        setRunningFor(elapsedSeconds);
      }
    }, 20);
    return () => clearInterval(interval);
  });

  const radius = `${circleRadiusRatio(runningFor, states, currentBreathState) * 80}vmin`;
  const background = circleColour(runningFor, states, currentBreathState);
  const timeRemaining = states[currentBreathState].duration - runningFor;

  return <div className="blue-circle" style={{width: radius, height: radius, background: background}}>
    <BreathLabel state={currentBreathState}/>
    <br/>
    <span>{timeRemaining.toFixed(2)}</span>
  </div>
}
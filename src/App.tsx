import React, {useEffect} from 'react';
import './App.css';
import BreathTimer from "./BreathTimer";

function App() {
  useEffect(() => {
    if ('wakeLock' in navigator) {
      console.log("Locking the wake state");
      // @ts-ignore
      const wakeLock = navigator.wakeLock.request().then(() => console.log("Locked"));
      return () => wakeLock.release().then("Unlocked");
    }
  });
  return (
    <div className="App">
        <BreathTimer in_time={5} in_hold={1} out_time={5} out_hold={1}/>
    </div>
  );
}

export default App;

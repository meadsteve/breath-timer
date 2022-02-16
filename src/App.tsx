import React, {useEffect} from 'react';
import './App.css';
import BreathTimerConfigerer from "./BreathTimerConfigerer";

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
        <BreathTimerConfigerer/>
    </div>
  );
}

export default App;

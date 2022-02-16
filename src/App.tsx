import React from 'react';
import './App.css';
import BreathTimer from "./BreathTimer";

function App() {
  return (
    <div className="App">
        <BreathTimer in_time={5} in_hold={1} out_time={5} out_hold={1}/>
    </div>
  );
}

export default App;

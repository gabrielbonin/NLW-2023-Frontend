import { useState } from "react";
import "./styles/global.css";
import { Habit } from "./components/Habit";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Habit completed={2} />
    </div>
  );
}

export default App;

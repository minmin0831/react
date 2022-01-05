import Square from "./Square";
import Input from "./Input";
import { useState } from "react";

function App() {

  const [colorValue, setColorValue] = useState(''); // hooks 1 State
  const [hexValue, setHexValue] = useState(''); // hooks 2 State
  const [isDarkText, setIsDarkText] = useState(true); // hooks 3 State

  return (
    <div className="App">
      <Square 
        colorValue={colorValue}
        hexValue={hexValue}
        isDarkText={isDarkText}
      />
      <Input 
        colorValue={colorValue}
        setColorValue={setColorValue}
        setHexValue={setHexValue}
        isDarkText={isDarkText}
        setIsDarkText={setIsDarkText}
      />
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import "./media.css";

function App() {
  const [texto, setTexto] = useState("");
  const blacklist = ["X²", "C", "⌫", "X³", "√", "∛", "−∕+", "="];

  //eslint-disable-next-line
  function adicionar(e: any) {
    if (blacklist.includes(e.target.textContent)) {
      return;
    } else {
      setTexto(texto + e.target.textContent);
    }
  }

  return (
    <>
      <div id="mainBox">
        <div id="textBox">
          <p>{texto}</p>
        </div>

        <div id="btnBox">
          <button className="btnCalc" onClick={adicionar}>
            &#37;
          </button>
          <button className="btnCalc" onClick={adicionar}>
            X²
          </button>
          <button className="btnCalc" onClick={adicionar}>
            C
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#9003;
          </button>

          <button className="btnCalc" onClick={adicionar}>
            X³
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#8730;
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#x221B;
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#xf7;
          </button>

          <button className="btnCalc" onClick={adicionar}>
            7
          </button>
          <button className="btnCalc" onClick={adicionar}>
            8
          </button>
          <button className="btnCalc" onClick={adicionar}>
            9
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#xd7;
          </button>

          <button className="btnCalc" onClick={adicionar}>
            4
          </button>
          <button className="btnCalc" onClick={adicionar}>
            5
          </button>
          <button className="btnCalc" onClick={adicionar}>
            6
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#x2212;
          </button>

          <button className="btnCalc" onClick={adicionar}>
            1
          </button>
          <button className="btnCalc" onClick={adicionar}>
            2
          </button>
          <button className="btnCalc" onClick={adicionar}>
            3
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#x2b;
          </button>

          <button className="btnCalc" onClick={adicionar}>
            &#x2212;&#x2215;&#x2b;
          </button>
          <button className="btnCalc" onClick={adicionar}>
            0
          </button>
          <button className="btnCalc" onClick={adicionar}>
            ,
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#x3d;
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

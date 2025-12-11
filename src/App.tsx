import { useState, useEffect } from "react";
import "./App.css";
import "./media.css";
import expr from "./scripts/operacao";

function App() {
  const [texto, setTexto] = useState("");
  const [temOp, setTemOp] = useState(false);
  const [temVirgula, setVirgula] = useState(false);

  const blacklist = ["X²", "X³", "√", "∛", "±"];
  const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const op = ["%", "÷", "×", "−", "+"];

  // const partes = texto.match(/(\d+(?:[.,]\d+)?|[+\-*/x÷%])/g) || [];

  function processarEntrada(valor: string) {
    if (blacklist.includes(valor)) {
      const partes = texto.match(/(\d+(?:[.,]\d+)?|[+\-*/x÷%])/g) || [];
      const ultimo = partes[partes.length - 1];

      if (valor == "X²") {
        const num = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(num ** 2);
      } else if (valor == "X³") {
        const num = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(num ** 3);
      } else if (valor == "√") {
        const num = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(Math.sqrt(num));
      } else if (valor == "∛") {
        const num = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(Math.cbrt(num));
      } else if (valor == "±") {
        const num = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(-num);
      }
      setTexto(partes.join(""));
    }

    if (op.includes(valor) && !temOp && texto !== "" && temVirgula == false) {
      // Operadores
      setTexto((t) => t + valor);
      setTemOp(true);
      return;
    }

    if (num.includes(valor)) {
      // Números
      setTexto((t) => t + valor);
      setTemOp(false);
      setVirgula(false);
      return;
    }

    if (valor == "c" || valor == "C") {
      // Deleta todos
      setTexto("");
      console.clear();
      setTemOp(false);
    }

    if (valor == "⌫") {
      setTexto((t) => t.slice(0, -1));
    }

    if (valor == "=") {
      if (texto.length >= 1) {
        setTexto(expr(texto));
      } else {
        return;
      }
    }
  }
  //eslint-disable-next-line
  function adicionar(e: any) {
    const valor = e.target.textContent;
    processarEntrada(valor);
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tecla = e.key;

      // números
      if (/[0-9]/.test(tecla)) {
        processarEntrada(tecla);
        return;
      }

      const mapaOp: Record<string, string> = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%",
        x: "×", // <-- adicionado
        X: "×", // <-- adicionado
      };

      if (mapaOp[tecla]) {
        processarEntrada(mapaOp[tecla]);
        return;
      }

      // backspace
      if (tecla === "Backspace") {
        processarEntrada("⌫");
        return;
      }

      // Apaga
      if (tecla === "c") {
        processarEntrada("c");
      }

      // Enter
      if (tecla === "Enter") {
        processarEntrada("=");
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    //eslint-disable-next-line
  }, [texto, temOp]);

  return (
    <>
      <div id="mainBox">
        <div id="textBox">
          <p>{texto}</p>
        </div>

        <div id="btnBox">
          <button className="btnCalc" onClick={adicionar}>
            X²
          </button>
          <button className="btnCalc" onClick={adicionar}>
            X³
          </button>
          <button className="btnCalc" onClick={adicionar}>
            C
          </button>
          <button className="btnCalc" onClick={adicionar}>
            &#9003;
          </button>

          <button className="btnCalc" onClick={adicionar}>
            &#37;
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
            ±
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

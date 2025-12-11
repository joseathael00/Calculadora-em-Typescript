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

  function processarEntrada(valor: string) {
    if (blacklist.includes(valor)) {
      const partes = texto.match(/(-?\d+(?:[.,]\d+)?|[+\-*/x÷×−%])/g) || [];

      if (partes.length === 0) return;

      const ultimo = partes[partes.length - 1];

      if (op.includes(ultimo)) return;

      if (valor === "X²") {
        const numValue = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(numValue ** 2).replace(".", ",");
      } else if (valor === "X³") {
        const numValue = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(numValue ** 3).replace(".", ",");
      } else if (valor === "√") {
        const numValue = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(Math.sqrt(numValue)).replace(
          ".",
          ",",
        );
      } else if (valor === "∛") {
        const numValue = Number(ultimo.replace(",", "."));
        partes[partes.length - 1] = String(Math.cbrt(numValue)).replace(
          ".",
          ",",
        );
      } else if (valor === "±") {
        if (ultimo.startsWith("-")) {
          partes[partes.length - 1] = ultimo.slice(1);
        } else {
          partes[partes.length - 1] = "-" + ultimo;
        }
      }

      const novoTexto = partes.join("");
      setTexto(novoTexto);

      const novoUltimo = partes[partes.length - 1];
      setVirgula(novoUltimo.includes(","));
      setTemOp(false);
      return;
    }

    if (op.includes(valor)) {
      if (texto === "") return;

      if (temOp) return;

      const ultimoChar = texto[texto.length - 1];
      if (ultimoChar === ",") return;

      setTexto((t) => t + valor);
      setTemOp(true);
      setVirgula(false);
      return;
    }

    if (valor === ",") {
      if (texto === "") return;

      const ultimoChar = texto[texto.length - 1];
      if (op.includes(ultimoChar)) return;

      if (ultimoChar === ",") return;

      const partes = texto.match(/(-?\d+(?:[.,]\d+)?|[+\-*/x÷×−%])/g) || [];
      const ultimoElemento = partes[partes.length - 1];

      if (
        ultimoElemento &&
        !op.includes(ultimoElemento) &&
        ultimoElemento.includes(",")
      ) {
        return;
      }

      setTexto((t) => t + ",");
      setVirgula(true);
      setTemOp(false);
      return;
    }

    if (num.includes(valor)) {
      setTexto((t) => t + valor);
      setTemOp(false);
      return;
    }

    if (valor === "c" || valor === "C") {
      setTexto("");
      console.clear();
      setTemOp(false);
      setVirgula(false);
      return;
    }

    if (valor === "⌫") {
      if (texto.length === 0) return;

      const novoTexto = texto.slice(0, -1);

      setTexto(novoTexto);

      if (novoTexto === "") {
        setTemOp(false);
        setVirgula(false);
        return;
      }

      const partes = novoTexto.match(/(-?\d+(?:[.,]\d+)?|[+\-*/x÷×−%])/g) || [];
      const ultimoElemento = partes[partes.length - 1];

      if (ultimoElemento && op.includes(ultimoElemento)) {
        setTemOp(true);
        if (partes.length >= 2) {
          const penultimoElemento = partes[partes.length - 2];
          setVirgula(penultimoElemento.includes(","));
        } else {
          setVirgula(false);
        }
      } else {
        setTemOp(false);
        setVirgula(ultimoElemento ? ultimoElemento.includes(",") : false);
      }

      return;
    }

    if (valor === "=") {
      if (texto.length >= 1) {
        const ultimoChar = texto[texto.length - 1];
        if (op.includes(ultimoChar) || ultimoChar === ",") return;

        const resultado = expr(texto);
        setTexto(resultado);
        setTemOp(false);
        setVirgula(resultado.includes(","));
      }
      return;
    }
  }

  function adicionar(e: React.MouseEvent<HTMLButtonElement>) {
    const valor = e.currentTarget.textContent;
    if (valor) {
      processarEntrada(valor);
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tecla = e.key;

      if (/[0-9]/.test(tecla)) {
        processarEntrada(tecla);
        return;
      }

      if (tecla === "," || tecla === ".") {
        processarEntrada(",");
        return;
      }

      const mapaOp: Record<string, string> = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%",
        x: "×",
        X: "×",
      };

      if (mapaOp[tecla]) {
        processarEntrada(mapaOp[tecla]);
        return;
      }

      if (tecla === "Backspace") {
        processarEntrada("⌫");
        return;
      }

      if (tecla === "c" || tecla === "C") {
        processarEntrada("c");
        return;
      }

      if (tecla === "Enter") {
        processarEntrada("=");
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [texto, temOp, temVirgula]);

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
            ⌫
          </button>

          <button className="btnCalc" onClick={adicionar}>
            %
          </button>
          <button className="btnCalc" onClick={adicionar}>
            √
          </button>
          <button className="btnCalc" onClick={adicionar}>
            ∛
          </button>
          <button className="btnCalc" onClick={adicionar}>
            ÷
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
            ×
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
            −
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
            +
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
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

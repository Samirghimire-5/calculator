"use client";
import React, { useState } from "react";

const Calculator = () => {
  const buttons = [
    { label: "AC", value: "AC", type: "function" },
    { label: "⌫", value: "undo", type: "function" },
    { label: "%", value: "%", type: "operator" },
    { label: "÷", value: "/", type: "operator" },

    { label: "7", value: "7", type: "number" },
    { label: "8", value: "8", type: "number" },
    { label: "9", value: "9", type: "number" },
    { label: "×", value: "*", type: "operator" },

    { label: "4", value: "4", type: "number" },
    { label: "5", value: "5", type: "number" },
    { label: "6", value: "6", type: "number" },
    { label: "−", value: "-", type: "operator" },

    { label: "1", value: "1", type: "number" },
    { label: "2", value: "2", type: "number" },
    { label: "3", value: "3", type: "number" },
    { label: "+", value: "+", type: "operator" },

    { label: "0", value: "0", type: "number" },
    { label: ".", value: ".", type: "decimal" },
    { label: "=", value: "=", type: "equal" },
  ];

  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [reset, setReset] = useState(false);

  const isOperator = (value) => ["+", "-", "*", "/", "%"].includes(value);
  const isDecimal = (value) => value === ".";


  const handleClick = (item) => {
    if (input.length === 0) {
      if (isOperator(item.value) && item.value !== "-") return; // Allow only negative sign as first character
    }

    const lastChar = input[input.length - 1];

    if (isOperator(item.value) || isDecimal(item.value)) {

      if (lastChar === item.value) return; // Prevent duplicate operators/decimals

      if (lastChar === ".") {
        if (isOperator(item.value)) return; // Prevent operator signs after decimal
      }

      if (isOperator(lastChar) && isOperator(item.value)) return; // Prevent operators signs from repeating

      if (
        lastChar === "%" &&
        (item.type === "number" || item.type === "decimal")
      )
        return; // Prevent numbers and decimals after percent operator
    }

    if (input.length == 20 && (item.type === "operator" || item.type === "number")) return;

    if (item.value === "=") {
      try {
        let percent = input;
        if (input.includes("%")) {
          percent = input.replaceAll("%", "*1/100");
        }
        setResult(eval(percent));
        setReset(true);
      } catch {
        setInput("");
        setResult("ERROR");
      }
      return;
    }

    if (reset && item.type === "number") {
      setInput(item.value);
      setResult("");
      setReset(false);
      return;
    } else if (item.type === "operator") {
      setInput(input + item.value);
      setReset(false);
      return;
    }

    if (item.value === "AC") {
      setInput("");
      setResult("");
      return;
    }

    if (item.value === "undo") {
      const del = input.slice(0, -1);
      setInput(del);
      setResult("");
      return;
    }

    setInput(input + item.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-6 bg-gray-200 w-80 p-6 rounded-xl shadow-lg">
        {/* Display Section */}
        <section className="flex flex-col items-end justify-center bg-gray-300 h-24 w-full rounded-lg text-black px-4 py-2 shadow-inner">
          <p className="text-xl opacity-70">{input || "0"}</p>
          <p className="text-3xl font-bold">{result || "0"}</p>
        </section>

        {/* Buttons Grid */}
        <section className="grid grid-cols-4 gap-3 w-full">
          {buttons.map((item) => (
            <button
              key={item.value}
              className={`flex items-center justify-center text-2xl font-medium w-16 h-16 rounded-lg transition-all 
                ${
                  item.type === "number" || item.type === "decimal"
                    ? "bg-gray-400 text-black hover:bg-gray-500 active:scale-90"
                    : ""
                }
                ${
                  item.type === "operator"
                    ? "bg-blue-500 text-white hover:bg-blue-600 active:scale-90"
                    : ""
                }
                ${
                  item.type === "function"
                    ? "bg-gray-500 text-white hover:bg-gray-600 active:scale-90"
                    : ""
                }
                ${
                  item.type === "equal"
                    ? "col-span-2 w-full bg-blue-600 text-white hover:bg-blue-700 active:scale-90"
                    : ""
                }
              `}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Calculator;
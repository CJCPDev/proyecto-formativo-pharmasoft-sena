import { useState } from "react";

export default function PaymentMethods({ onChange }) {
  const [method, setMethod] = useState("card");

  const handleSelect = (value) => {
    setMethod(value);
    onChange(value);
  };

  return (
    <div className="grid bg-white p-4 rounded-xl shadow-md mb-4">
      <h2 className="font-bold mb-2">Método de pago</h2>

      <div className="grid  w-40 gap-3">
        <button
          onClick={() => handleSelect("card")}
          className={`flex-1 p-3 rounded-lg border ${
            method === "card" ? "bg-indigo-100 border-indigo-500" : ""
          }`}
        >
          💳 Tarjeta
        </button>

        <button
          onClick={() => handleSelect("cash")}
          className={`flex-1 p-3 rounded-lg border ${
            method === "cash" ? "bg-green-100 border-green-500" : ""
          }`}
        >
          💵 Efectivo
        </button>

        <button
          onClick={() => handleSelect("pse")}
          className={`flex-1 p-3 rounded-lg border ${
            method === "pse" ? "bg-blue-100 border-blue-500" : ""
          }`}
        >
          🏦 PSE
        </button>
      </div>
    </div>
  );
}

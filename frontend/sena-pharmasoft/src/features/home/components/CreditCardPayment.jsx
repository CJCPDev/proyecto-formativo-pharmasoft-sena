import { useState } from "react";

export default function CreditCardPayment({ total = 0, onSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const handlePay = () => {
    setLoading(true);

    setTimeout(() => {
      if (cardNumber.replace(/\s/g, "").length >= 16) {
        onSuccess({
          status: "approved",
          transactionId: Date.now(),
        });
      } else {
        alert("Tarjeta inválida");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        💳 Pago con tarjeta
      </h2>

      {/* Tarjeta visual */}
      <div className="bg-linear-to-r from-green-600 to-brand-hover text-white p-4 rounded-xl shadow-md">
        <p className="text-sm">Número de tarjeta</p>
        <p className="text-lg tracking-widest">
          {cardNumber || "•••• •••• •••• ••••"}
        </p>

        <div className="flex justify-between mt-4 text-sm">
          <span>{name || "NOMBRE"}</span>
          <span>CVV: {cvv || "***"}</span>
        </div>
      </div>

      <input
        type="text"
        placeholder="Número de tarjeta"
        value={cardNumber}
        onChange={(e) =>
          setCardNumber(formatCardNumber(e.target.value))
        }
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="text"
        placeholder="Nombre del titular"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-brand-hover hover:bg-brand-hover/90 text-white py-3 rounded-xl font-semibold transition"
      >
        {loading ? "Procesando pago..." : `Pagar $${total}`}
      </button>
    </div>
  );
}
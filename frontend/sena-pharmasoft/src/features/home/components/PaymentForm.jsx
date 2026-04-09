import { useState } from "react";

export default function PaymentForm({ total, onSuccess }) {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);

    // Simulación de pago
    setTimeout(() => {
      if (cardNumber.length >= 16) {
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
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Pago con tarjeta</h2>

      <input
        type="text"
        placeholder="Número de tarjeta"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <input
        type="text"
        placeholder="Nombre del titular"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      <button
        onClick={handlePay}
        className="bg-green-500 text-white w-full py-2 rounded"
      >
        {loading ? "Procesando..." : `Pagar $${total}`}
      </button>
    </div>
  );
}
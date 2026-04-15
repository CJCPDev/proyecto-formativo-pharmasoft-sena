export default function CashPayment({ total = 0, onSuccess }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
      <h2 className="text-xl font-bold mb-2">Pago en efectivo</h2>

      <p className="text-gray-600 mb-4">
        Debes pagar al momento de la entrega.
      </p>

      <div className="text-2xl font-bold text-green-600 mb-4">
        Total: ${total.toLocaleString()}
      </div>

      <button
        onClick={() =>
          onSuccess({
            status: "pending",
            transactionId: Date.now(),
          })
        }
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Confirmar pedido
      </button>
    </div>
  );
}

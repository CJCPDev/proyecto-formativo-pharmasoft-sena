export default function PsePayment({ total = 0, onSuccess }) {
  const handlePse = () => {
    // simulación tipo redirección bancaria
    setTimeout(() => {
      onSuccess({
        status: "approved",
        transactionId: Date.now(),
      });
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Pago con PSE</h2>

      <select className="w-full border p-3 rounded-lg mb-4">
        <option>Selecciona tu banco</option>
        <option>Bancolombia</option>
        <option>Davivienda</option>
        <option>BBVA</option>
      </select>

      <button
        onClick={handlePse}
        className="w-full bg-blue-600 text-white py-3 rounded-xl"
      >
        Pagar con PSE (${total})
      </button>
    </div>
  );
}

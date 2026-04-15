export default function PaymentResult({ result }) {
  if (!result) return null;

  return (
    <div className="mt-4 p-4 rounded-xl bg-green-100 text-green-700">
      <h2 className="font-bold">Pago exitoso</h2>
      <p>ID Transacción: {result.transactionId}</p>
    </div>
  );
}

export default function PaymentSummary({ products, total }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl">
      <h2 className="font-bold mb-2">Resumen</h2>

      {products.map((p) => (
        <div key={p.id} className="flex justify-between text-sm">
          <span>{p.nombre}</span>
          <span>${p.precio}</span>
        </div>
      ))}

      <hr className="my-2" />

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  );
}
export default function FacturaPos({ saleData, products = [] }) {
  return (
    <div className="w-75 bg-white p-4 text-sm font-mono border">

      <h2 className="text-center font-bold">
        FARMACIA SENA
      </h2>

      <p className="text-center">
        Factura: {saleData?.numeroFactura}
      </p>

      <p className="text-center">
        Fecha: {saleData?.fecha}
      </p>

      <hr className="my-2" />

      <p>Cliente: {saleData?.usuario}</p>
      <p>Vendedor: {saleData?.farmaceuta}</p>

      <hr className="my-2" />

      {/* PRODUCTOS */}
      {products?.map((p, i) => (
        <div key={i} className="flex justify-between">
          <span>
            {p.name} x{p.quantity}
          </span>
          <span>
            ${p.price * p.quantity}
          </span>
        </div>
      ))}

      <hr className="my-2" />

      <div className="flex justify-between">
        <span>Total</span>
        <span>
          ${products.reduce((acc, p) => acc + p.price * p.quantity, 0)}
        </span>
      </div>

      <p className="text-center mt-3">
        ¡Gracias por su compra!
      </p>

    </div>
  );
}
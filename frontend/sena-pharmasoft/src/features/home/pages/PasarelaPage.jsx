import { useState } from "react";
import {
  CashPayment,
  PsePayment,
  PaymentResult,
  CreditCardPayment,
  PaymentMethods,
} from "@/features/home";

export default function PasarelaPage({ total, products }) {
  const [method, setMethod] = useState("card");
  const [result, setResult] = useState(null);

  const paymentComponents = {
    card: <CreditCardPayment total={total} onSuccess={setResult} />,
    cash: <CashPayment total={total} onSuccess={setResult} />,
    pse: <PsePayment total={total} onSuccess={setResult} />,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* PAGOS */}
        <div className="min-h-87 transition-all duration-300">
          <PaymentMethods
            onChange={(value) => {
              setMethod(value);
              setResult(null); // se debe resetear el componente para que este nullo cada que cambie entre medios de pago
            }}
          />

          {paymentComponents[method]}

          <PaymentResult result={result} />
        </div>

        {/* RESUMEN */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Resumen de tu compra</h2>

          {products?.map((p) => (
            <div
              key={p.id_carrito}
              className="flex justify-between text-sm mb-2"
            >
              <span>{p.nombre_medicamento}</span>
              <span>${parseFloat(p.subtotal).toLocaleString()}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-brand-hover">
              <span> ${total?.toLocaleString() || 0} </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

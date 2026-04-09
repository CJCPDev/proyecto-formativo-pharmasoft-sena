import { useState } from "react";
import {PaymentForm, PaymentResult, PaymentSummary} from "@/features/home";


export default function CarSellHome() {
  const [result, setResult] = useState(null);

  const products = [
    { id: 1, nombre: "Paracetamol", precio: 5000 },
    { id: 2, nombre: "Ibuprofeno", precio: 8000 },
  ];

  const total = products.reduce((acc, p) => acc + p.precio, 0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <PaymentSummary products={products} total={total} />

      <div>
        <PaymentForm total={total} onSuccess={setResult} />
        <PaymentResult result={result} />
      </div>
    </div>
  );
}
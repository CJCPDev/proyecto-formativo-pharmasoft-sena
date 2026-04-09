import { useState } from "react";
import { useLocation } from "react-router-dom";
import { PaymentForm, PaymentResult, PaymentSummary, HomeNavbar } from "@/features/home";
import { Home } from "lucide-react";

export default function CarSellHome() {
  const { state } = useLocation();
  const [result, setResult] = useState(null);

  const products = state?.cart || [];
  const total = state?.total || 0;

  return (
    <div className="grid">
          <div className="grid bg-brand-soft/10">


      <div className="mb-2">
        <HomeNavbar        />
      </div>
</div>


      <div className="grid grid-cols-2">
        <PaymentForm total={total} onSuccess={setResult} />
        <PaymentResult result={result} />
      <PaymentSummary products={products} total={total} />
      </div>
    </div>
  );
}
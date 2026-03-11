import React, { useState, useEffect } from "react";
import { getPharmaForm } from "../services/selectService.js";
import ProductForm from "../components/ProductForm";
import Card from "../../../shared/components/Card.jsx";

export default function HomePage() {
  const [pharmaForm, setPharmaForm] = useState([]);

  useEffect(() => {
    getPharmaForm().then(setPharmaForm);
  }, []);

  const product = pharmaForm.find((prod) => prod.id === 5);

  return (
    <div className="min-h-screen flex flex-col">
      <main className=" p-8">
        <div className="grid grid-cols-3 gap-6">
          {pharmaForm.map((med) => (
            <ProductForm key={med.id} med={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { getPharmaForm } from "../services/selectService.js";
import ProductForm from "../components/ProductForm";

export default function HomePage() {
  const [pharmaForm, setPharmaForm] = useState([]);

  useEffect(() => {
    getPharmaForm().then(setPharmaForm);
  }, []);

  return (
    <div className=" min-h-screen flex flex-col">
      <main className="fp-8">
        <div className="grid grid-cols-3 gap-6">
          {pharmaForm.map((item) => (
            <ProductForm key={item.id} med={item} />
          ))}
        </div>
      </main>
      <footer className="">
        <p className="">
          © 2026 PHARMASOFT - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
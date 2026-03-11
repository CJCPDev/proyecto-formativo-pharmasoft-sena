// import React, { useState, useEffect } from "react";
// import { getPharmaForm } from "../services/selectService.js";
// import ProductForm from "../components/ProductForm";
// import  Card  from "../../../shared/components/Card.jsx";

// export default function HomePage() {
//   const [pharmaForm, setPharmaForm] = useState([]);

//   useEffect(() => {
//     getPharmaForm().then(setPharmaForm);
//   }, []);

//   const product = pharmaForm.find(prod => prod.id === 3)

//   return (
//     <div className="bg-[var(--color-background)] min-h-screen flex flex-col">
//       <main className="flex-grow p-8">
//         <div className="grid grid-cols-3 gap-6">
//           {pharmaForm.map((med) => (
//             <ProductForm key={med.id} med={med} />
//           ))}
//         </div>
//       </main>
//       <footer className="bg-[var(--color-surface)] text-center p-4">
//         <p className="text-[var(--text-info-general)] text-[var(--color-text-mute)]">
//           © 2026 PHARMASOFT - Todos los derechos reservados
//         </p>
//         { product && <Card product ={product} />}
//       </footer>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { getPharmaForm } from "../services/selectService.js";
import ProductForm from "../components/ProductForm";
import Card from "../../../shared/components/Card.jsx";

export default function HomePage() {
  const [pharmaForm, setPharmaForm] = useState([]);

  useEffect(() => {
    getPharmaForm().then(setPharmaForm);
  }, []);

  const product = pharmaForm.find((prod) => prod.id === 3);

  return (
    <div className="bg-[var(--color-background)] min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <div className="grid grid-cols-3 gap-6">
          {pharmaForm.map((med) => (
            <ProductForm key={med.id} med={med} />
          ))}
        </div>
      </main>
      <footer className="bg-[var(--color-surface)] text-center p-4">
        <p className="text-[var(--text-info-general)] text-[var(--color-text-mute)]">
          © 2026 PHARMASOFT - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}

import React from "react";
import "./HomePage.css";
import acetaminofenImg from "/images/acetaminofen.jpg";
import desloratadinaImg from "/images/desloratadina.jpg";
import ibuprofenoImg from "/images/ibuprofeno.jpg";
import metronidazolImg from "/images/metronidazol.png";
import mieltertosImg from "/images/mieltertos.png";
import seretideImg from "/images/seretide.png";

const medicamentos = [
  { id: 1, marca: "AG", nombre: "Acetaminofén", descripcion: "Caja por 10 tabletas", precio: 20000, imagen: acetaminofenImg },
  { id: 2, marca: "AG", nombre: "Desloratadina", descripcion: "Caja por 10 tabletas", precio: 20000, imagen: desloratadinaImg },
  { id: 3, marca: "La Santé", nombre: "Ibuprofeno", descripcion: "Caja por 50 tabletas", precio: 20000, imagen: ibuprofenoImg },
  { id: 4, marca: "MK", nombre: "Metronidazol", descripcion: "Caja por 40 tabletas", precio: 20000, imagen: metronidazolImg },
  { id: 5, marca: "Natural", nombre: "Mieltertos", descripcion: "Jarabe por 240 ml", precio: 25000, imagen: mieltertosImg },
  { id: 6, marca: "GSK", nombre: "Seretide", descripcion: "Inhalador polvo 125 mcg", precio: 120000, imagen: seretideImg },
];

export default function HomePage() {
  return (
    <div className="homepage">
      <main>
        <div className="productos-grid">
          {medicamentos.map((med) => (
            <div key={med.id} className="producto-card">
              <img src={med.imagen} alt={med.nombre} className="producto-img" />
              <h3 className="producto-marca">{med.marca}</h3>
              <p className="producto-nombre">{med.nombre}</p>
              <p className="producto-descripcion">{med.descripcion}</p>
              <p className="producto-precio">${med.precio.toLocaleString()}</p>
              <button className="btn-agregar">Agregar</button>
            </div>
          ))}
        </div>
      </main>
      <footer className="homepage-footer">
        <p>© 2026 PHARMASOFT - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

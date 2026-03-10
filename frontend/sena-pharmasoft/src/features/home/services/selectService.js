import acetaminofenImg from "/images/acetaminofen.jpg";
import desloratadinaImg from "/images/desloratadina.jpg";
import ibuprofenoImg from "/images/ibuprofeno.jpg";
import metronidazolImg from "/images/metronidazol.png";
import mieltertosImg from "/images/mieltertos.png";
import seretideImg from "/images/seretide.png";

export async function getPharmaForm() {

    return [
        { id: 1, marca: "AG", nombre: "Acetaminofén", descripcion: "Caja por 10 tabletas", precio: 20000, imagen: acetaminofenImg },
        { id: 2, marca: "AG", nombre: "Desloratadina", descripcion: "Caja por 10 tabletas", precio: 20000, imagen: desloratadinaImg },
        { id: 3, marca: "La Santé", nombre: "Ibuprofeno", descripcion: "Caja por 50 tabletas", precio: 20000, imagen: ibuprofenoImg },
        { id: 4, marca: "MK", nombre: "Metronidazol", descripcion: "Caja por 40 tabletas", precio: 20000, imagen: metronidazolImg },
        { id: 5, marca: "Natural", nombre: "Mieltertos", descripcion: "Jarabe por 240 ml", precio: 25000, imagen: mieltertosImg },
        { id: 6, marca: "GSK", nombre: "Seretide", descripcion: "Inhalador polvo 125 mcg", precio: 120000, imagen: seretideImg },
    ];
}
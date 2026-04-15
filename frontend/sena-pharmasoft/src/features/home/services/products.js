import acetaminofenImg from "/images/acetaminofen.jpg";
import desloratadinaImg from "/images/desloratadina.jpg";
import ibuprofenoImg from "/images/ibuprofeno.jpg";
import metronidazolImg from "/images/metronidazol.png";
import mieltertosImg from "/images/mieltertos.png";
import seretideImg from "/images/seretide.png";
import aspirinaImg from "/images/aspirina.png";
import glucophageImg from "/images/glucophage.jpg";
import lantusImg from "/images/lantus.jpg";
import tamifluImg from "/images/tamiflu.jpg";
import ventolinImg from "/images/ventolin.jpg";
import viagraImg from "/images/viagra.jpg";
import voltarenImg from "/images/voltaren.jpg";
import aleveImg from "/images/aleve.jpg";
import augmentinImg from "/images/augmentin.jpg";
import buscapinaImg from "/images/buscapina.jpg";
import diovanImg from "/images/diovan.jpg";
import ensureImg from "/images/ensure.jpg";
import lipitorImg from "/images/lipitor.png";
import pedialyteImg from "/images/pedialyte.jpg";
import singulairImg from "/images/singulair.jpg";
import xenicalImg from "/images/xenical.png";
import canestenIMG from "/images/canesten.jpg";
import zithromaxImg from "/images/zithromax.jpg";
import exforgeImg from "/images/exforge.jpg";
import dolipraneImg from "/images/doliprane.png";

export const products = [
  {
    id: 1,
    marca: "AG",
    title: "Acetaminofén",
    description: "Caja por 10 tabletas",
    detail:
      "Analgésico y antipirético utilizado para aliviar dolores leves y fiebre.",
    price: 20000,
    stock: 25,
    image: acetaminofenImg,
  },

  {
    id: 2,
    marca: "AG",
    title: "Desloratadina",
    description: "Caja por 10 tabletas",
    detail:
      "Antihistamínico que ayuda a controlar síntomas de alergias como estornudos y picazón.",
    price: 20000,
    stock: 18,
    image: desloratadinaImg,
  },

  {
    id: 3,
    marca: "La Santé",
    title: "Ibuprofeno",
    description: "Caja por 50 tabletas",
    detail: "Antiinflamatorio usado para reducir dolor, inflamación y fiebre.",
    price: 20000,
    stock: 40,
    image: ibuprofenoImg,
  },

  {
    id: 4,
    marca: "MK",
    title: "Metronidazol",
    description: "Caja por 40 tabletas",
    detail:
      "Antibiótico y antiparasitario para tratar infecciones bacterianas.",
    price: 20000,
    stock: 12,
    image: metronidazolImg,
  },

  {
    id: 5,
    marca: "Natural",
    title: "Mieltertos",
    description: "Jarabe por 240 ml",
    detail: "Jarabe natural que alivia la tos y la irritación de garganta.",
    price: 25000,
    stock: 30,
    image: mieltertosImg,
  },

  {
    id: 6,
    marca: "GSK",
    title: "Seretide",
    description: "Inhalador polvo 125 mcg",
    detail:
      "Tratamiento para el asma que combina broncodilatador y antiinflamatorio.",
    price: 120000,
    stock: 10,
    image: seretideImg,
  },

  {
    id: 7,
    marca: "Pfizer",
    title: "Viagra",
    description: "Tabletas 100 mg",
    detail: "Medicamento para tratar la disfunción eréctil.",
    price: 95000,
    stock: 8,
    image: viagraImg,
  },

  {
    id: 8,
    marca: "Bayer",
    title: "Aspirina",
    description: "Tabletas 500 mg",
    detail:
      "Analgésico y antiinflamatorio también usado para prevención cardiovascular.",
    price: 12000,
    stock: 50,
    image: aspirinaImg,
  },

  {
    id: 9,
    marca: "Roche",
    title: "Tamiflu",
    description: "Cápsulas 75 mg",
    detail: "Antiviral para el tratamiento y prevención de la gripe.",
    price: 180000,
    stock: 6,
    image: tamifluImg,
  },

  {
    id: 10,
    marca: "Novartis",
    title: "Voltaren",
    description: "Gel tópico 1%",
    detail:
      "Gel antiinflamatorio para aliviar dolores musculares y articulares.",
    price: 35000,
    stock: 22,
    image: voltarenImg,
  },

  {
    id: 11,
    marca: "Sanofi",
    title: "Lantus",
    description: "Insulina glargina 100 UI/ml",
    detail: "Insulina de acción prolongada para el control de la diabetes.",
    price: 210000,
    stock: 5,
    image: lantusImg,
  },

  {
    id: 12,
    marca: "Merck",
    title: "Glucophage",
    description: "Tabletas 1000 mg",
    detail: "Medicamento para el control de la diabetes tipo 2.",
    price: 25000,
    stock: 35,
    image: glucophageImg,
  },

  {
    id: 13,
    marca: "GSK",
    title: "Ventolin",
    description: "Inhalador 100 mcg",
    detail: "Broncodilatador de acción rápida para aliviar crisis asmáticas.",
    price: 48000,
    stock: 14,
    image: ventolinImg,
  },

  {
    id: 14,
    marca: "Abbott",
    title: "Ensure",
    description: "Suplemento nutricional 400 g",
    detail: "Suplemento que aporta proteínas, vitaminas y minerales.",
    price: 42000,
    stock: 27,
    image: ensureImg,
  },

  {
    id: 15,
    marca: "Bayer",
    title: "Aleve",
    description: "Tabletas 200 mg",
    detail: "Antiinflamatorio utilizado para dolores musculares y articulares.",
    price: 28000,
    stock: 19,
    image: aleveImg,
  },

  {
    id: 16,
    marca: "Pfizer",
    title: "Lipitor",
    description: "Tabletas 40 mg",
    detail: "Medicamento para reducir el colesterol en la sangre.",
    price: 87000,
    stock: 11,
    image: lipitorImg,
  },

  {
    id: 17,
    marca: "Novartis",
    title: "Diovan",
    description: "Tabletas 80 mg",
    detail: "Tratamiento para la hipertensión arterial.",
    price: 76000,
    stock: 9,
    image: diovanImg,
  },

  {
    id: 18,
    marca: "Sanofi",
    title: "Buscapina",
    description: "Tabletas 10 mg",
    detail: "Alivia espasmos y dolores abdominales.",
    price: 15000,
    stock: 45,
    image: buscapinaImg,
  },

  {
    id: 19,
    marca: "Roche",
    title: "Xenical",
    description: "Cápsulas 120 mg",
    detail:
      "Ayuda en el tratamiento de la obesidad reduciendo absorción de grasas.",
    price: 165000,
    stock: 7,
    image: xenicalImg,
  },

  {
    id: 20,
    marca: "Abbott",
    title: "Pedialyte",
    description: "Solución oral 500 ml",
    detail: "Solución para prevenir y tratar la deshidratación.",
    price: 14000,
    stock: 33,
    image: pedialyteImg,
  },

  {
    id: 21,
    marca: "Merck",
    title: "Singulair",
    description: "Tabletas 10 mg",
    detail: "Medicamento para el control del asma y alergias.",
    price: 92000,
    stock: 13,
    image: singulairImg,
  },

  {
    id: 22,
    marca: "GSK",
    title: "Augmentin",
    description: "Tabletas 625 mg",
    detail: "Antibiótico de amplio espectro para infecciones bacterianas.",
    price: 68000,
    stock: 16,
    image: augmentinImg,
  },

  {
    id: 23,
    marca: "Bayer",
    title: "Canesten",
    description: "Crema tópica 1%",
    detail: "Tratamiento antifúngico para infecciones en la piel.",
    price: 22000,
    stock: 21,
    image: canestenIMG,
  },

  {
    id: 24,
    marca: "Pfizer",
    title: "Zithromax",
    description: "Tabletas 250 mg",
    detail: "Antibiótico utilizado para infecciones respiratorias.",
    price: 73000,
    stock: 15,
    image: zithromaxImg,
  },

  {
    id: 25,
    marca: "Novartis",
    title: "Exforge",
    description: "Tabletas 5/160 mg",
    detail: "Medicamento combinado para tratar la hipertensión.",
    price: 105000,
    stock: 6,
    image: exforgeImg,
  },

  {
    id: 26,
    marca: "Sanofi",
    title: "Doliprane",
    description: "Tabletas 1000 mg",
    detail: "Analgésico para aliviar dolor y fiebre.",
    price: 19000,
    stock: 28,
    image: dolipraneImg,
  },
];

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DetailCard from "../components/DetailCard";
import { getAllProducts } from "@/features/products/services/productService.js";
import HomeNavbar from "@/features/home/components/HomeNavbar";
import Footer from "../../../shared/layout/Footer";

export default function DetailProductPage() {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const product = products.find(
    (prod) => prod.id_medicamento == params.id_medicamento,
  );

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);
  return (
    <div>
      <HomeNavbar />
      <div className="min-h-screen m-auto w-full flex items-center justify-center text-black">
        {product && <DetailCard product={product} />}
      </div>
      <Footer />
    </div>
  );
}

import { CardsMedicine } from "@/features/dashboard";
import HomeNavbar from "../components/HomeNavbar";
import Footer from "../../../shared/layout/Footer";
import { Carousel, CarSellHome } from "@/features/home";
import { useState } from "react";
import AuthModal from "../components/AuthModal";

export default function HomePage() {
  // Estado para forzar actualización del contador
  const [contadorKey, setContadorKey] = useState(0);
  const [shouldOpenCart, setShouldOpenCart] = useState(false);
  // Estados para el modal de autenticación
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleProductoAgregado = () => {
    setContadorKey((prev) => prev + 1);
  };

  return (
    <div className="grid bg-brand-soft/10">
      {/* Modal de autenticación */}
      <AuthModal
        openLogin={openLogin}
        openRegister={openRegister}
        setOpenLogin={setOpenLogin}
        setOpenRegister={setOpenRegister}
      />

      <div className="mb-2">
        <HomeNavbar
          key={contadorKey}
          onOpenRegister={() => setOpenLogin(true)}
          setOpenLogin={setOpenLogin}
          setShouldOpenCart={setShouldOpenCart}
          shouldOpenCart={shouldOpenCart}
          onSearch={setSearchQuery}
          showSearch={false}
        />
      </div>

      <div>
        <Carousel />
      </div>

      <div className="flex pt-8">
        <CardsMedicine
          onProductoAgregado={handleProductoAgregado}
          searchQuery={searchQuery}
        />
      </div>
      <Footer />
    </div>
  );
}

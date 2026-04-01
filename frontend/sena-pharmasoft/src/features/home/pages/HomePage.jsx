import { Cards } from "@/features/dashboard";
import HomeNavbar from "../components/HomeNavbar";
import { SideCategory, SidebarCategory } from "../../dashboard";
import Footer from "../../../shared/layout/Footer";
import { Carousel } from "@/features/home";
import { useState } from "react";
import Logo from "@/assets/images/logo-removebg-preview.png";
import {AuthModal} from "@/features/home";

export default function HomePage() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="grid bg-brand-soft/10">
      <div className="mb-2">
        <HomeNavbar onOpenRegister={() => setOpenLogin(true)} />
      </div>
      <div>
        <Carousel />
      </div>

<AuthModal
  openLogin={openLogin}
  openRegister={openRegister}
  setOpenLogin={setOpenLogin}
  setOpenRegister={setOpenRegister}
  Logo={Logo}
/>
      <div className="flex pt-8">
        {/*               <SidebarCategory/> */}
        <Cards />
      </div>
      <Footer />
    </div>
  );
}

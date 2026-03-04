import heroBg from "@/assets/images/logo.webp" 
import Navbar from "../../../shared/layout/Navbar"

export default function HomePage (){
    return(
        <section
            className="relative min-h-screen w-full flex items-center justify-center text-black"
            style={
                {
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }
            }
        >
            <Navbar variant="transparent"></Navbar>
            <div className="relative z-10 text-center text-text-inverse">
                hola
            </div>
        </section>
    )
}
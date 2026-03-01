import heroBg from "@/assets/images/logo.webp" 

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
            <div className="relative z-10 text-center text-text-inverse">

                <p>
                    Aprende según tus gusto, desde panaderia hasta control numérico
                </p>
            </div>
        </section>
    )
}
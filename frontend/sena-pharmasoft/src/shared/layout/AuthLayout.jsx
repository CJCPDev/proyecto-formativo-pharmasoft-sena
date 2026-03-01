import authBg from "../../assets/images/background.webp"
import { Outlet, useLocation} from "react-router-dom"


export default function AuthLayout (){
    
    const blurPages = [
        '/forgot-password',
        '/reset-password'
    ]

    const location = useLocation();
    const isblur = blurPages.includes(location.pathname)

    return (
        <div className="h-screen grid grid-cols-2 font-main">
            <div className={`grid h-full w-full bg-brand-soft
            ${
                isblur ? 'blur-xs scale-100' : ''
            }
            `}>
                <section className="text-center">
                    <h1 className="text-big-title text-brand-hover font-extrabold tracking-widest">PHARMASOFT</h1>
                    <h2 className="text-small-text text-brand-hover font-semibold tracking-wide">Tu software de confianza</h2>
                </section>
                <section
                    className='h-115 bg-center'
                    style={
                        {
                            backgroundImage: `url(${authBg})`
                        }
                    } 
                    >
                    
                </section>  
            <h1 className="text-general-title text-brand-hover font-semibold font-secondary tracking-widest text-center">Rapido, agíl e intuitivo</h1>
            </div>
            {/* contenido externo que se inyecta */}
            <main className="flex items-center justify-center">
                <Outlet/>
            </main>
        </div>
    )
};
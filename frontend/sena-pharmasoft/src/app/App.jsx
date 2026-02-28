import SuppliersForm from '../features/suppliers/componentes/SuppliersForm'

export default function App(){
  return (
    <div className="grid grid-cols-1 items-center gap-6 justify-center justify-items-center">
      <h1 className="text-big-tittle text-family-main">
        Crear Proveedor
      </h1>
       <SuppliersForm/>
    </div>
  )
}
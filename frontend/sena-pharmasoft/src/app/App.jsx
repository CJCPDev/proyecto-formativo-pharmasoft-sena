import FormMedicamentos from '../features/products/FormMedicamentos'

export default function App(){
  return (
    <div className="grid grid-cols-1 items-center gap-1 justify-center justify-items-center bg-amber-300">
       <h2 className="text-3xl font-bold text-green-800 text-center mb-1">
        Creación de Medicamento
      </h2>
      <div>
       <FormMedicamentos/>
      </div>
    </div>
  )
}
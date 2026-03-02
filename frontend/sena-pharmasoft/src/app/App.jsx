
import FormMedicamentos from '../features/products/FormMedicamentos';
import Button from '../shared/components/Button';

export default function App(){
  return (
    <div className="grid grid-cols-1 items-center gap-1 justify-center justify-items-center bg-amber-50">
       <h2 className="text-3xl font-bold text-green-800 text-center mb-1">
        Creación de Medicamento
      </h2>
      <div>
      <FormMedicamentos/>
      <Button/>
      </div>
    </div>

import { RouterProvider } from 'react-router-dom';
import router from '../app/router/router';




export default function App(){
  
  
  return (  
    <RouterProvider router={router}/>
  )})
}
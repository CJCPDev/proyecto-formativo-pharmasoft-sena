
import { RouterProvider } from 'react-router-dom';
import router from '../app/router/router';
import FormMedicamentos from '../features/products/FormMedicamentos';
import Button from '../shared/components/Button';

export default function App() {
  return (
    <div className="grid grid-cols-1 items-center gap-1 justify-center justify-items-center bg-amber-50">
      <h2 className="text-3xl font-bold text-green-800 text-center mb-1">
      </h2>
      <div>
        <FormMedicamentos />
        
      </div>

      <RouterProvider router={router} />
    </div>
  );
}

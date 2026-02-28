import FormVentas from '../features/sells/components/FormVentas'
import Background from '@/shared/components/background'
import 'tailwindcss';
import Navbar from '@/shared/layout/Navbar';

export default function App(){
  return (
    
    <div className="grid grid-cols-1 items-center gap-6 justify-center justify-items-center h-screen bg-brand">
      <Background/>
      <div className='absolute'>
        <Navbar/>
       <FormVentas/>
      </div>
    </div>
  )
}
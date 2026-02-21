import UserForm from '../features/users/components/UserForm'

export default function App(){
  return (
    <div className="grid grid-cols-1 items-center gap-6 justify-center justify-items-center">
      <h1 className="text-green-800 font-bold text-2xl">
        Creación de usuario
      </h1>
      <div>
       <UserForm/>
      </div>
    </div>
  )
}
import UserForm from '../features/users/components/UserForm'

export default function App(){
  return (
    <div className="grid grid-cols-1 items-center gap-6 justify-center justify-items-center">
      <h1 className="text-black">
        ¡Hola mundo!
      </h1>
      <div>
       <UserForm/>
      </div>
    </div>
  )
}
import UserForm from '../features/users/components/UserForm'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-10 bg-gray-100">
      <h1 className="text-2xl font-bold text-black mb-6">
        PHARMASOFT
      </h1>
      <div>
       <UserForm/>
      </div>
    </div>
  )
}
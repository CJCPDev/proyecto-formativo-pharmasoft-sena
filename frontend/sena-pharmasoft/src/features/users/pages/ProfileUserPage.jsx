// // Espacio para visualizar la informacion detallada de un usuario

// const Card = ({ user }) => {

//     const { nombre_completo, tipo_identificacion, numero_documento, rol, telefono, direccion, estado,image } = user;

//     return(
//         <div className="
//             w-80
//             text-text-inverse
//             dark:bg-neutral-950/70
//             backdrop-blur-[2px]
//             shadow-lg
//             rounded-2xl
//             overflow-hidden
//             hover:shadow-black
//             transition-shadow
//             duration-700
//         ">
        
//         <div>

//         </div>

//         <img
//             src={image}
//             alt={title}
//             className="w-full h-48 object-contain"
//         />

//         <div className="p-5 space-y-3">

//             <h2 className="text-xl font-semibold">
//                 {title}
//             </h2>

//             <p className="text-sm">
//                 {description}
//             </p>

//             <p className="text-lg font-bold text-cyan-200">
//                 {/*Esto agrega separadores de miles, lo que mejora la lectura. toLocaleString() */}
//                 ${price.toLocaleString()}
//             </p>
//         </div>
//         </div>
//     );
// };

// export default Card;


// const ProfileUserPage = ({ user }) => {
//   const {
//     nombre_completo,
//     tipo_identificacion,
//     numero_documento,
//     rol,
//     telefono,
//     direccion,
//     estado,
//     image
//   } = user;

//   return (
//     <div
//       className="
//         w-80
//         text-text-inverse
//         dark:bg-neutral-950/70
//         backdrop-blur-[2px]
//         shadow-lg
//         rounded-2xl
//         overflow-hidden
//         hover:shadow-black
//         transition-shadow
//         duration-700
//       "
//     >
//       <img
//         src={image}
//         alt={nombre_completo}
//         className="w-full h-48 object-contain"
//       />

//       <div className="p-5 space-y-3">
//         <h2 className="text-xl font-semibold">
//           {nombre_completo}
//         </h2>

//         <p className="text-sm">
//           {tipo_identificacion} - {numero_documento}
//         </p>

//         <p className="text-sm">
//           Rol: {rol}
//         </p>

//         <p className="text-sm">
//           Teléfono: {telefono}
//         </p>

//         <p className="text-sm">
//           Dirección: {direccion}
//         </p>

//         <p className="text-sm">
//           Estado: {estado}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProfileUserPage;



const Card = ({ user }) => {
  const {
    nombre_completo,
    tipo_identificacion,
    numero_documento,
    rol,
    telefono,
    direccion,
    estado,
    image,
    correo
  } = user;

  return (
    <div>
    <div className="w-full h-full">
      {/* Encabezado */}
      <div className="bg-indigo-600 text-white text-center py-4">
        <h2 className="text-2xl font-bold">Perfil de usuario</h2>
      </div>

      {/* Contenido en dos columnas */}
      <div className="w-36 h-40 absolute grid grid-cols-2 gap-6 p-6">
        {/* Columna izquierda: datos */}
        <div className="space-y-2 text-gray-700">
          <p><span className="font-semibold">Nombre:</span> {nombre_completo}</p>
          <p><span className="font-semibold">Tipo de Documento:</span> {tipo_identificacion}</p>
          <p><span className="font-semibold">Número de documento:</span> {numero_documento}</p>
          <p><span className="font-semibold">Rol:</span> {rol}</p>
          <p><span className="font-semibold">Correo electrónico:</span> {correo}</p>
          <p><span className="font-semibold">Teléfono:</span> {telefono}</p>
          <p><span className="font-semibold">Dirección:</span> {direccion}</p>
          <p><span className="font-semibold">Estado:</span> {estado}</p>
        </div>

        {/* Columna derecha: imagen */}
        <div className="flex justify-center items-start">
          <img
            src={image}
            alt={nombre_completo}
            className="w-48 h-48 object-cover rounded-full border-4 border-indigo-600"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-around px-6 pb-6">
        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
          Regresar
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
          Editar
        </button>
      </div>
    </div>
  </div>
  );
};

export default Card;


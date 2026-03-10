import Button from '../../../shared/components/Button';


export default function ProductForm({ med }) {
    return (
        <div className="grid grid-cols-1 shadow-md p-2">
            <img
                src={med.imagen}
                alt={med.nombre}
                className="w-24 h-24 object-cover  mb-2 mx-auto"
            />
            <h3 className="">
                {med.marca}
            </h3>
            <p className="">
                {med.nombre}
            </p>
            <p className="">
                {med.descripcion}
            </p>
            <p className="">
                ${med.precio.toLocaleString()}
            </p>
            {/* Aquí usas el Button con sus props */}
            <div className="grid grid-cols-1 w-20  mx-auto">
                <Button variant="boton" size="b" >
                    Agregar
                </Button>
            </div>
        </div>
    );
}
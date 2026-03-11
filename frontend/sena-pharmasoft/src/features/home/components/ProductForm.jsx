import Card from "../../../shared/components/Card.jsx";
import Button from "../../../shared/components/Button";

export default function ProductForm({ med }) {
    return (
        <div className="bg-white rounded-2xl shadow-lg">
        <Card
            product={{
            title: med.marca,
            image: med.imagen,
            price: med.precio,
            description: med.descripcion,
            }}
        >
            {/* Botón dentro de la card */}
            <Button variant="boton" size="b">
            Agregar
            </Button>
        </Card>
        </div>
    );
}

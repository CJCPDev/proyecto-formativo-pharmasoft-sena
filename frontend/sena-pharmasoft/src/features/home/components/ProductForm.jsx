import Button from '../../../shared/components/Button';

export default function ProductForm({ med }) {
    return (
        <div className="bg-[var(--color-surface)] rounded-[var(--border-main-container)] shadow-md p-2">
        <img
            src={med.imagen}
            alt={med.nombre}
            className="w-24 h-24 object-cover rounded-[var(--border-buttons)] mb-2 mx-auto"
        />
        <h3 className="font-[var(--font-main)] text-[var(--text-info-general)] text-[var(--color-text-primary)]">
            {med.marca}
        </h3>
        <p className="text-[var(--text-info-regular)] text-[var(--color-text-secondary)]">
            {med.nombre}
        </p>
        <p className="text-[var(--text-info-medium)] text-[var(--color-text-mute)]">
            {med.descripcion}
        </p>
        <p className="text-[var(--text-info-general)] font-[var(--font-extrabold)] text-[var(--color-text-primary)]">
            ${med.precio.toLocaleString()}
        </p>
        {/* Aquí usas el Button con sus props */}
        <Button variant="primary" size="sm">
            Agregar
        </Button>
        </div>
    );
}

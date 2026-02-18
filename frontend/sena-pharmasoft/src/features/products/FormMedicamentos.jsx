import Input from "../../shared/components/Input";

export default function FormMedicamentos() {
  return (
    <div className="min-h-screen p-12"
    style={{ backgroundColor: "var(--color-background)"}}
    >
        <div
            className="max-w-7x1 mx-auto rounded-x1 p-10"
            style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
            }}
        >

      <form className="flex gap-12">

        {/* Columna 1 */}
        <div className="flex flex-col gap-6 flex-1">
          <Input label="Nombre del medicamento" placeholder="Nombre del medicamento" />
          <Input label="Formas farmacéuticas" placeholder="Formas farmacéuticas" />
          <Input label="Vía de administración" placeholder="Vía de administración" />
          <Input label="Laboratorio" placeholder="Laboratorio" />
          <Input label="Concentración" placeholder="Concentración" />
          <Input label="Proveedor" placeholder="Proveedor" />
        </div>

        {/* Columna 2 */}
        <div className="flex flex-col gap-6 flex-1">
          <Input label="Lote" placeholder="Lote" />
          <Input label="Fecha fabricación" placeholder="Fecha fabricación" type="date" />
          <Input label="Fecha vencimiento" placeholder="Fecha vencimiento" type="date" />
          <Input label="Stock" placeholder="Stock" />
          <Input label="Precio de costo" placeholder="Precio de costo" />
          <Input label="Precio de venta" placeholder="Precio de venta" />
        </div>

        {/* Columna 3 */}
        <div className="flex flex-col gap-6 flex-1">
          <Input label="Requiere fórmula" placeholder="Requiere fórmula" />
          <Input label="Estado" placeholder="Estado" />
          <Input label="Descripción" placeholder="Descripción" />
        </div>

      </form>
     </div>
    </div>
  );
}

import { Title, Input, Select, Button } from "@/shared/components";
import sellStates from "../../../data/selects/sellStates.json";
import paymentStates from "../../../data/selects/paymenStates.json";
import { useParams, useNavigate } from "react-router-dom";
import { getSalesById } from "../services/getSalesById";

export default function SaleView() {
  const navigate = useNavigate();
  const params = useParams();

  const sale = getSalesById(params.id);

  return (
    <div className="font-main bg-white grid gap-2 w-full h-full p-6 rounded-lg">
      <div className="w-full px-6 rounded-xl">
        <Title title="Ver Venta" />

        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-3">
            <Input
              label="Número de factura"
              value={sale?.numeroFactura}
              disabled
            />

            <Input label="Usuario" value={sale?.usuario} disabled />

            <Input label="Farmaceuta" value={sale?.farmaceuta} disabled />

            <Select
              label="Estado"
              options={sellStates}
              value={sale?.sellStates}
              disabled
            />
          </div>

          <div className="flex flex-col gap-3">
            <Input
              label="Fecha y hora"
              type="datetime-local"
              value={sale?.fechaHora}
              disabled
            />

            <Select
              label="Tipo de pago"
              options={paymentStates}
              value={sale?.paymentStates}
              disabled
            />
          </div>
        </div>

        <div className="pt-5">
          <Input label="Producto" value="Acetaminofén" disabled />
        </div>

        <div className="flex justify-center pt-6">
          <Button onClick={() => navigate(`/ver-venta/${params.id}/editar`)}>
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import FormMedicamentos from "../components/FormMedicamentos";
import { Title } from "../../../shared/components"

export default function CreateProductPage() {
    return (
        <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4 w-350">
        <Title
            title="Crear Medicamento"
        />
            <FormMedicamentos />
        </div>
    );
}


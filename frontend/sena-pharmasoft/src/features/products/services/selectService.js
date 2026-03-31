// Importa los JSON directamente desde src/data/selects
import pharmaForm from "../../../data/selects/getPharmaForm.json";
import administrationTypes from "../../../data/selects/getAdministrationTypes.json";
import laboratoriesTypes from "../../../data/selects/getLaboratoriesTypes.json";
import suppliers from "../../../data/selects/getSuppliers.json";
import statesTypes from "../../../data/selects/getStatesTypes.json";

// Formas farmacéuticas
export async function getPharmaForm() {
    return pharmaForm;
}

// Vías de administración
export async function getAdministrationTypes() {
    return administrationTypes;
}

// Laboratorios
export async function getLaboratoriesTypes() {
    return laboratoriesTypes;
}

// Proveedores
export async function getSuppliers() {
    return suppliers;
}

// Estados
export async function getStatesTypes() {
    return statesTypes;
}

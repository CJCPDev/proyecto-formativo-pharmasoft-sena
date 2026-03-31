<<<<<<< HEAD
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
=======
export async function getPharmaForm() {
    const response = await fetch("/src/data/selects/getPharmaForm.json");

    return response.json();    
}
export async function getAdministrationTypes() {
    const response = await fetch("/src/data/selects/getAdministrationTypes.json");

    return response.json();    
}
export async function getSuppliers() {
    const response = await fetch("/src/data/selects/getSuppliers.json");

    return response.json();    
}
export async function getLaboratoriesTypes() {
    const response = await fetch("/src/data/selects/getLaboratoriesTypes.json");

    return response.json();    
}
export async function getStatesTypes() {
    const response = await fetch("/src/data/selects/getStatesTypes.json");

    return response.json();    
} 
>>>>>>> piloto_backend

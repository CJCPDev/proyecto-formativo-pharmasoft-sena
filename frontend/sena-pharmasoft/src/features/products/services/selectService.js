
import pharmaForm from "../../../data/selects/pharmaForm.json";
import administrationTypes from "../../../data/selects/administrationTypes.json";
import suppliers from "../../../data/selects/suppliers.json";
import laboratoriesTypes from "../../../data/selects/laboratoriesTypes.json";
import statesTypes from "../../../data/selects/statesTypes.json";

export async function getPharmaForm() {
    return pharmaForm();
}

export async function getAdministrationTypes() {
    return administrationTypes();
}

export async function getSuppliers() {
    return suppliers();
}

export async function getLaboratoriesTypes() {
    return laboratoriesTypes();
}

export async function getStatesTypes() {
    return statesTypes();
}
/* export async function getPharmaForm() {
    const response = await fetch("/src/data/selects/pharmaForm.json");

    return response.json();    
}
export async function getAdministrationTypes() {
    const response = await fetch("src/data/selects/administrationTypes.json");

    return response.json();    
}
export async function getSuppliers() {
    const response = await fetch("../../../data/selects/suppliers.json");

    return response.json();    
}
export async function getLaboratoriesTypes() {
    const response = await fetch("../../../data/selects/laboratoriesTypes.json");

    return response.json();    
}
export async function getStatesTypes() {
    const response = await fetch("../../../data/selects/statesTypes.json");

    return response.json();    
} */
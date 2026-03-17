export async function getPharmaForm() {
    const response = await fetch("/src/data/selects/pharmaForm.json");

    return response.json();    
}
export async function getAdministrationTypes() {
    const response = await fetch("src/data/selects/administrationTypes.json");

    return response.json();    
}
export async function getSuppliers() {
    const response = await fetch("src/data/selects/suppliers.json");

    return response.json();    
}
export async function getLaboratoriesTypes() {
    const response = await fetch("src/data/selects/laboratoriesTypes.json");

    return response.json();    
}
export async function getStatesTypes() {
    const response = await fetch("src/data/selects/statesTypes.json");

    return response.json();    
} 
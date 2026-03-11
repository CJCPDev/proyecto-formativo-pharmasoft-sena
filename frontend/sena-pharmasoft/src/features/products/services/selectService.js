export async function getPharmaForm() {
    const response = await fetch("src/data/pharmaForm.json"); 
    return response.json();
}
export async function getAdministrationTypes() {
    const response = await fetch("src/data/administrationTypes.json"); 
    return response.json();
}
export async function getSuppliers() {
    const response = await fetch("src/data/suppliers.json"); 
    return response.json();
}
export async function getLaboratoriesTypes() {
    const response = await fetch("src/data/laboratoriesTypes.json"); 
    return response.json();
}
export async function getStatesTypes() {
    const response = await fetch("src/data/statesTypes.json"); 
    return response.json();
}
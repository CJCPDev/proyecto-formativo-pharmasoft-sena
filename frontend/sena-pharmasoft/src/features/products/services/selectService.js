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
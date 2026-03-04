export async function getPharmaForm(){
    const response = await fetch("/src/data/selects/pharmaForm.json");
    return await response.json();
}
export async function getAdministrationTypes(){
    const response = await fetch("/src/data/selects/administrationTypes.json");
    return await response.json();
}
export async function getSuppliers(){
    const response = await fetch("/src/data/selects/suppliers.json");
    return await response.json();
}
export async function getLaboratoriesTypes(){
    const response = await fetch("/src/data/selects/laboratoriesTypes.json");
    return await response.json();
}
export async function getStatesTypes(){
    const response = await fetch("/src/data/selects/statesTypes.json");
    return await response.json();
}
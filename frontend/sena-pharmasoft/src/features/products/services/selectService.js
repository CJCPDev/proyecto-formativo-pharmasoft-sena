// export async function getPharmaForm() {
//     const response = await fetch("/src/data/selects/getPharmaForm.json");

//     return response.json();    
// }
// export async function getAdministrationTypes() {
//     const response = await fetch("/src/data/selects/getAdministrationTypes.json");
//     return response.json();    
// }
// export async function getSuppliers() {
//     const response = await fetch("/src/data/selects/getSuppliers.json");

//     return response.json();    
// }
// export async function getLaboratoriesTypes() {
//     const response = await fetch("/src/data/selects/getLaboratoriesTypes.json");

//     return response.json();    
// }
// export async function getStatesTypes() {
//     const response = await fetch("/src/data/selects/getStatesTypes.json");

//     return response.json();    
// } 
// ─────────────────────────────────────────────
// selectService.js
// Servicios para llenar los selects del frontend
// con datos dinámicos desde el backend
// ─────────────────────────────────────────────

// Formas farmacéuticas
export async function getPharmaForm() {
    const res = await fetch("http://127.0.0.1:8000/api/forma_farmaceutica/");
    const data = await res.json();
    return data.map(item => ({
        value: item.id_forma_farmaceutica,
        label: item.nombre_forma_farmaceutica
    }));
    }

    // Vías de administración
    export async function getAdministrationTypes() {
    const res = await fetch("http://127.0.0.1:8000/api/via_administracion/");
    const data = await res.json();
    return data.map(item => ({
        value: item.id_via_administracion,
        label: item.nombre_via_administracion
    }));
    }

    // Proveedores
    export async function getSuppliers() {
    const res = await fetch("http://127.0.0.1:8000/api/proveedores/");
    const data = await res.json();
    return data.map(item => ({
        value: item.id_proveedor,
        label: item.nombre_proveedor
    }));
    }

    // Laboratorios
    export async function getLaboratoriesTypes() {
    const res = await fetch("http://127.0.0.1:8000/api/laboratorios/");
    const data = await res.json();
    return data.map(item => ({
        value: item.id_laboratorio,
        label: item.nombre_laboratorio
    }));
    }

    // Estados de medicamento
    export async function getStatesTypes() {
    const res = await fetch("http://127.0.0.1:8000/api/estado_medicamento/");
    const data = await res.json();
    return data.map(item => ({
        value: item.id_estado,
        label: item.nombre_estado
    }));
    }

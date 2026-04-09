// src/modules/products/services/selectService.js

export async function getPharmaForm() {
  const res = await fetch("http://127.0.0.1:8000/api/formas-farmaceuticas/");
  const data = await res.json();
  return data.map(item => ({
    value: item.id_forma_farmaceutica,
    label: item.nombre_forma_farmaceutica
  }));
}

export async function getAdministrationTypes() {
  const res = await fetch("http://127.0.0.1:8000/api/vias-administracion/");
  const data = await res.json();
  return data.map(item => ({
    value: item.id_via_administracion,
    label: item.nombre_via_administracion
  }));
}

export async function getSuppliers() {
  const res = await fetch("http://127.0.0.1:8000/api/suppliers/");  
  const data = await res.json();
  return data.map(item => ({
    value: item.id,
    label: item.nombre
  }));
}

export async function getLaboratoriesTypes() {
  const res = await fetch("http://127.0.0.1:8000/api/laboratorios/");
  const data = await res.json();
  return data.map(item => ({
    value: item.id_laboratorio,
    label: item.nombre_laboratorio
  }));
}

export async function getStatesTypes() {
  const res = await fetch("http://127.0.0.1:8000/api/estados-medicamento/");
  const data = await res.json();
  return data.map(item => ({
    value: item.id_estado,
    label: item.nombre_estado
  }));
}
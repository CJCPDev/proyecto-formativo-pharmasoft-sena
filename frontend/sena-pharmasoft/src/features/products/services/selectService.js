// Servicios que consultan la API para obtener las opciones de los selects del formulario.
// Cada función retorna un array con el formato { value, label } que esperan los componentes Select.

// Obtiene las formas farmacéuticas disponibles (ej: tableta, jarabe, cápsula)
export async function getPharmaForm() {
  const res = await fetch("http://127.0.0.1:8000/api/formas-farmaceuticas/");
  const data = await res.json();
  // Mapeamos al formato { value, label } que consume el componente Select
  return data.map((item) => ({
    value: item.id_forma_farmaceutica,
    label: item.nombre_forma_farmaceutica,
  }));
}

// Obtiene las vías de administración disponibles (ej: oral, intravenosa, tópica)
export async function getAdministrationTypes() {
  const res = await fetch("http://127.0.0.1:8000/api/vias-administracion/");
  const data = await res.json();
  return data.map((item) => ({
    value: item.id_via_administracion,
    label: item.nombre_via_administracion,
  }));
}

// Obtiene los proveedores registrados en el sistema
export async function getSuppliers() {
  const res = await fetch("http://127.0.0.1:8000/api/suppliers/");
  const data = await res.json();
  return data.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
}

// Obtiene los laboratorios fabricantes disponibles
export async function getLaboratoriesTypes() {
  const res = await fetch("http://127.0.0.1:8000/api/laboratorios/");
  const data = await res.json();
  return data.map((item) => ({
    value: item.id_laboratorio,
    label: item.nombre_laboratorio,
  }));
}

// Obtiene los estados posibles de un medicamento (ej: activo, inactivo, vencido)
export async function getStatesTypes() {
  const res = await fetch("http://127.0.0.1:8000/api/estados-medicamento/");
  const data = await res.json();
  return data.map((item) => ({
    value: item.id_estado,
    label: item.nombre_estado,
  }));
}

// Obtiene las subformas farmacéuticas correspondientes a una forma farmacéutica específica.
// Recibe el id de la forma para filtrar solo las subformas que le pertenecen
// (ej: si la forma es "tableta", las subformas pueden ser "masticable", "efervescente", etc.)
export const getSubformasFarmaceuticas = async (idForma) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/subformas-farmaceuticas/?id_forma=${idForma}`,
  );
  const data = await res.json();
  return data.map((s) => ({
    value: s.id_subforma_farmaceutica,
    label: s.nombre_subforma_farmaceutica,
  }));
};

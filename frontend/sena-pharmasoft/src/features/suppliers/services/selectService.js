import axios from "axios";

export async function getSuppliersState() {
    const response = await fetch("/src/data/selects/getSuppliersState.json");

    return response.json();
};

export const getDepartamentos = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/departamento/');
    return response.data.map(dep => ({
      value: dep.id_departamento,
      label: dep.nombre_departamento
    }));
  } catch (error) {
    console.error('Error al obtener departamentos:', error);
    return [];
  }
};

export const getMunicipios = async (departamentoId) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/municipio/?departamento=${departamentoId}`);
    return response.data.map(mun => ({
      value: mun.id_municipio,
      label: mun.nombre_municipio
    }));
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    return [];
  }
};
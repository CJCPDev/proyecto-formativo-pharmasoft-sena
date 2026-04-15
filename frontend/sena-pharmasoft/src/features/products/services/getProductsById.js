// Obtiene los datos de un medicamento específico desde la API usando su id.
// Retorna el objeto con toda la información del medicamento.
export const getProductsById = async (id) => {
  const res = await fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`);
  const data = await res.json();
  return data;
};

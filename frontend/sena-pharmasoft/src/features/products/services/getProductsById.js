export const getProductsById = async (id) => {
    const res = await fetch(`http://127.0.0.1:8000/api/medicamentos/${id}/`);
    const data = await res.json();
    return data;
}
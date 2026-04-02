const API_URL = "http://localhost:4000/api/suppliers";


export async function createSupplier(supplierData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(supplierData),
  });


  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear proveedor");
  }


  return response.json();
}


const API_URL = "http://localhost:4000/api/products";


export async function createProduct(productData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });


  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear producto");
  }


  return response.json();
}
``

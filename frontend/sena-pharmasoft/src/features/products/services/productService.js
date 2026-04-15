// URL base de la API de medicamentos
const API_URL = "http://127.0.0.1:8000/api/medicamentos/";

// Obtiene todos los medicamentos desde la API
export async function getAllProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }
  return response.json();
}

// Busca medicamentos por nombre usando el parámetro de búsqueda
export async function searchProducts(query) {
  const response = await fetch(`${API_URL}?search=${query}`);
  if (!response.ok) {
    throw new Error("Error al buscar productos");
  }
  return response.json();
}

// Envía un nuevo producto al backend mediante una petición POST.
// Recibe el objeto con los datos del producto y retorna el producto creado.
// Lanza un error si el servidor responde con un código de fallo.
export async function createProduct(productData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      // Indica al servidor que el cuerpo de la petición está en formato JSON
      "Content-Type": "application/json",
    },
    // Convertimos el objeto a string JSON para enviarlo en el cuerpo
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    // Leemos el mensaje de error que devuelve el servidor y lo lanzamos
    // para que el componente que llama a esta función pueda manejarlo
    const error = await response.json();
    throw new Error(error.error || "Error al crear producto");
  }

  // Retornamos el producto recién creado tal como lo devuelve el servidor
  return response.json();
}

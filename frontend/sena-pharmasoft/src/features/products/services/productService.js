import axios from "axios"

const productsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/medicamentos/"
});

export const getAllProducts = async () => {
  const response = await productsApi.get("/");
  return response.data;
};
// const API_URL = "http://localhost:4000/api/products";


// export async function createProduct(productData) {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(productData),
//   });


//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.error || "Error al crear producto");
//   }


//   return response.json();
// }
// ``

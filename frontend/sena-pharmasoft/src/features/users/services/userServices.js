// src/features/users/services/userService.js


const API_URL = "http://localhost:4000/api/users";


export async function createUser(userData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });


  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Error al crear usuario");
  }


  return response.json();
}
``

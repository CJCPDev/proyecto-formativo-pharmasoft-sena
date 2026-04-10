import React from "react";
import AdminProductForm from "../components/AdminProductForm";
import { useLocation } from "react-router-dom";

export default function CreateProductPage() {
  const location = useLocation();
  const onCreated = location.state?.onCreated;

  return (
    <div className="relative grid gap-6 bg-white rounded-xl shadow-2xl p-4">
      {/* 👉 Pasamos la función al formulario */}
      <AdminProductForm onCreated={onCreated} />
    </div>
  );
}

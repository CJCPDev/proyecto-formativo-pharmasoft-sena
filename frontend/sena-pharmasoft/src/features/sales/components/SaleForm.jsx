import { Title, Input, Select, Button } from "@/shared/components";
import sellStates from "../../../data/selects/sellStates.json";
import paymentStates from "../../../data/selects/paymenStates.json";
import { useState, useEffect } from "react";
import { saleSchema } from "../schemas/saleSchema";
import { useParams } from "react-router-dom";
import { getSalesById } from "../services/getSalesById";
import { getAllProducts } from "../../products/services/productService";

export default function SaleForm({
  onAddProduct,
  setSaleData,
  saleData,
  isView = false,
}) {
  const params = useParams();
  const isEdit = Boolean(params.id);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [formData, setFormData] = useState({
    usuario: "",
    farmaceuta: "",
    sellStates: "",
    paymentStates: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(!isEdit && !isView);
  const [search, setSearch] = useState("");

  // ================== LOAD DATA ==================
  useEffect(() => {
    const fetchData = async () => {
      if (!isEdit) return;

      try {
        const sales = await getSalesById(params.id);

        setSaleData((prev) => ({
          ...prev,
          numeroFactura: sales?.numero_factura || "",
          fecha: sales?.fecha_hora || "",
          usuario: sales?.usuario || "",
          farmaceuta: sales?.farmaceuta || "",
          productos: sales?.productos || [],
          subtotal: sales?.subtotal_venta || 0,
          iva: sales?.iva_venta || 0,
          total: sales?.total_venta || 0,
        }));

        setFormData({
          usuario: sales?.usuario || "",
          farmaceuta: sales?.farmaceuta || "",
          sellStates: sales?.estado_venta || "",
          paymentStates: sales?.tipo_pago || "",
        });
      } catch (error) {
        console.error("Error cargando venta:", error);
      }
    };

    fetchData();
  }, [isEdit, params.id]);

  // ================== LOAD PRODUCTS ==================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProducts();
  }, []);

  // ================== FILTRO ==================
  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
      return;
    }

    const results = products
      .filter((p) =>
        p.nombre_medicamento?.toLowerCase().includes(search.toLowerCase()),
      )
      .slice(0, 5);

    setFilteredProducts(results);
  }, [search, products]);

  // ================== HANDLE CHANGE ==================
  const handleChange = (e) => {
    if (isView) return;

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================== SUBMIT ==================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isView) return;

    const result = saleSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    setSaleData((prev) => ({
      ...prev,
      usuario: formData.usuario,
      farmaceuta: formData.farmaceuta,
      estado_venta: formData.sellStates,
      tipo_pago: formData.paymentStates,
    }));

    setIsEditing(false);
  };

  // ================== ADD PRODUCT ==================
  const handleAddProduct = (product) => {
    if (!product || isView) return;
    onAddProduct({
      id: Date.now(),
      name: product.nombre_medicamento,
      quantity: 1,
      price: product.precio_venta,
      image: product.imagen_url,
    });

    setSearch("");
    setFilteredProducts([]);
  };

  return (
    <div className="font-main bg-white grid gap-4 w-full h-120 p-2 rounded-lg">
      <form onSubmit={handleSubmit} className="w-full px-6 rounded-xl">
        <Title
          title={
            isView
              ? "Detalle de venta"
              : isEdit
                ? "Editar venta"
                : "Crear venta"
          }
        />

        <div className="grid grid-cols-2 w-full gap-2">
          <Input
            label="Número de factura"
            disabled
            value={saleData?.numeroFactura || ""}
          />

          <Input label="Fecha y hora" disabled value={saleData?.fecha || ""} />

          <div className="col-span-2">
            <Input
              label="Usuario"
              name="usuario"
              disabled={isView || !isEditing}
              value={formData.usuario}
              onChange={handleChange}
              error={errors.usuario}
            />
          </div>

          <div className="col-span-2">
            <Input
              label="Vendedor"
              name="farmaceuta"
              disabled={isView || !isEditing}
              value={formData.farmaceuta}
              onChange={handleChange}
              error={errors.farmaceuta}
            />
          </div>

          <Select
            label="Estado"
            name="sellStates"
            options={sellStates}
            disabled={isView || !isEditing}
            value={formData.sellStates}
            onChange={handleChange}
          />

          <Select
            label="Tipo de pago"
            name="paymentStates"
            options={paymentStates}
            disabled={isView || !isEditing}
            value={formData.paymentStates}
            onChange={handleChange}
          />
        </div>

        {!isView && (
          <div className="flex py-4 justify-center">
            {isEdit && !isEditing && (
              <Button type="button" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}

            {isEditing && <Button type="submit">Guardar</Button>}
          </div>
        )}
      </form>

      {!isView && (
        <div className="mt-10 p-4 border rounded-lg relative">
          <h3>Agregar productos</h3>

          <div className="flex gap-2 flex-col">
            <Input
              placeholder="Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {filteredProducts.length > 0 && (
              <div className="bg-white border rounded-md max-h-40 overflow-y-auto shadow">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleAddProduct(product)}
                  >
                    {product.nombre_medicamento} - ${product.precio_venta}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

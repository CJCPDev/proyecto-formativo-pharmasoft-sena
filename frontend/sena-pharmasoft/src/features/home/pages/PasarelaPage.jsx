import { useState } from "react";
import {
  CashPayment,
  PsePayment,
  PaymentResult,
  CreditCardPayment,
  PaymentMethods,
} from "@/features/home";
import { useLocation, useNavigate } from "react-router-dom";
import HomeNavbar from "@/features/home/components/HomeNavbar";
import Footer from "@/shared/layout/Footer";
import AuthModal from "@/features/home/components/AuthModal";
import { updateCarrito } from "@/features/cart/services/cartService";
import { getUsuarioActual } from "@/features/auth/services/authService";

export default function PasarelaPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const total = state?.total || 0;
  const products = state?.cart || [];

  const [method, setMethod] = useState("card");
  const [result, setResult] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [shouldOpenCart, setShouldOpenCart] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  // Cuando el pago es exitoso confirmamos el carrito en Django
  const handlePagoExitoso = async (resultadoPago) => {
    setResult(resultadoPago);
    setConfirmando(true);

    try {
      const usuarioActual = getUsuarioActual();

      // Confirmamos cada item del carrito
      for (const item of products) {
        await updateCarrito(item.id_carrito, {
          estado: "confirmado",
          aprobado_por: usuarioActual.id,
        });
      }

      // Redirigimos al home después de 3 segundos
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error al confirmar carrito:", error);
      alert(
        "El pago fue procesado pero hubo un error al confirmar el pedido. Contacta soporte.",
      );
    } finally {
      setConfirmando(false);
    }
  };

  const paymentComponents = {
    card: <CreditCardPayment total={total} onSuccess={handlePagoExitoso} />,
    cash: <CashPayment total={total} onSuccess={handlePagoExitoso} />,
    pse: <PsePayment total={total} onSuccess={handlePagoExitoso} />,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AuthModal
        openLogin={openLogin}
        openRegister={openRegister}
        setOpenLogin={setOpenLogin}
        setOpenRegister={setOpenRegister}
      />

      <HomeNavbar
        setOpenLogin={setOpenLogin}
        shouldOpenCart={shouldOpenCart}
        setShouldOpenCart={setShouldOpenCart}
        showSearch={false}
      />

      <div className="flex-1 flex justify-center items-center p-6">
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* PAGOS */}
          <div className="min-h-87 transition-all duration-300">
            <PaymentMethods
              onChange={(value) => {
                setMethod(value);
                setResult(null);
              }}
            />
            {paymentComponents[method]}

            {/* Resultado del pago */}
            {result && (
              <div className="mt-4 p-4 rounded-xl bg-green-100 text-green-700">
                <h2 className="font-bold text-lg">✅ Pago exitoso</h2>
                <p className="text-sm">
                  ID Transacción: {result.transactionId}
                </p>
                {confirmando ? (
                  <p className="text-sm mt-1">Confirmando pedido...</p>
                ) : (
                  <p className="text-sm mt-1">
                    Redirigiendo al inicio en 3 segundos...
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RESUMEN */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Resumen de tu compra</h2>

            {products?.map((p) => (
              <div
                key={p.id_carrito}
                className="flex justify-between text-sm mb-2"
              >
                <span>{p.nombre_medicamento}</span>
                <span>${parseFloat(p.subtotal).toLocaleString()}</span>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-brand-hover">
                ${total?.toLocaleString() || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer showPortalEmpleados={false} />
    </div>
  );
}

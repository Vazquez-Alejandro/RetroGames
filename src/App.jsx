import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { GestionCupones } from "./components/GestionCupones/GestionCupones";
import { GestionProductos } from "./components/GestionProductos/GestionProductos";
import { Login } from "./components/Login/Login";
import { Registro } from "./components/Registro/Registro";
import { Perfil } from "./components/Perfil/Perfil";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { BootScreen } from "./components/BootScreen/BootScreen";
import { Notification } from "./components/Notification/Notification";

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onFinish={() => setBooted(true)} />}
      <Notification />
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/productos"
              element={<ItemListContainer />}
            />
            <Route path="/product/:id" element={<ItemDetailContainer />} />
            <Route path="/carrito" element={<CartView />} />
            <Route path="/admin/cupones" element={
              <ProtectedRoute rolesPermitidos={["admin"]}>
                <GestionCupones />
              </ProtectedRoute>
            } />
            <Route path="/admin/productos" element={
              <ProtectedRoute rolesPermitidos={["admin"]}>
                <GestionProductos />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default App;

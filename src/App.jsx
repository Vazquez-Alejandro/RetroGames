import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { GestionCupones } from "./components/GestionCupones/GestionCupones";
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
            <Route path="/admin/cupones" element={<GestionCupones />} />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default App;

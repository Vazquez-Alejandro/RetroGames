import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './pages/Home'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { BootScreen } from './components/BootScreen/BootScreen'

function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!booted && <BootScreen onFinish={() => setBooted(true)} />}
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ItemListContainer Mensaje="Nuestros productos" />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/carrito" element={<Cart />} />
          </Routes>
        </Layout>
      </div>
    </>
  )
}

export default App

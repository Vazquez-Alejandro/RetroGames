import './App.css'
import { Layout } from './components/Layout/Layout'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <div className="app">
      <Layout>
        <h1 className="main-title">Retro Games</h1>
        <p className="main-subtitle">Los mejores juegos, consolas y accesorios retro</p>
        <ItemListContainer Mensaje="Nuestros productos destacados" />
      </Layout>
    </div>
  )
}

export default App

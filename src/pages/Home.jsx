import { ItemListContainer } from '../components/ItemListContainer/ItemListContainer'

export function Home() {
  return (
    <>
      <h1 className="main-title">Retro Games</h1>
      <p className="main-subtitle">Los mejores juegos, consolas y accesorios retro</p>
      <ItemListContainer Mensaje="Nuestros productos destacados" />
    </>
  )
}

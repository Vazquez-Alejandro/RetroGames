import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  )
}

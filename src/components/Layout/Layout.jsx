import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { ScreenGlitch } from "../ScreenGlitch/ScreenGlitch";

export function Layout({ children }) {
  return (
    <>
      <ScreenGlitch />
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
}

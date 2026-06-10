import { useState } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

const products = [
  { name: "Alien Blaster X", category: "juegos", description: "Defiende la galaxia en este clásico shooter espacial.", price: 25000, stock: 10, image: "/images/AlienBlaster.png" },
  { name: "Banana Kong", category: "juegos", description: "Acompañá al simpático mono en su aventura pixelada por la jungla.", price: 18000, stock: 10, image: "/images/BananaKong.png" },
  { name: "Cyber Samurai", category: "juegos", description: "Enfrentá el futuro con espada en mano.", price: 28000, stock: 10, image: "/images/CyberSamurai.png" },
  { name: "Dungeon Explorer", category: "juegos", description: "Aventurate en las profundidades de un oscuro calabozo.", price: 20000, stock: 10, image: "/images/DungeonExplorer.png" },
  { name: "Pixel Quest", category: "juegos", description: "Tomá tu espada y explorá un reino lleno de castillos.", price: 22000, stock: 10, image: "/images/PixelQuest.png" },
  { name: "Turbo Racer 88", category: "juegos", description: "Sentí la velocidad pura del clásico arcade de carreras.", price: 24000, stock: 12, image: "/images/TurboRacer.png" },
  { name: "Atari 2600", category: "consolas", description: "La consola que empezó todo.", price: 45000, stock: 5, image: "/images/Atari2600.png" },
  { name: "ColecoVision", category: "consolas", description: "Potente consola de 8 bits con gráficos superiores.", price: 55000, stock: 4, image: "/images/ColecoVision.png" },
  { name: "Family Game", category: "consolas", description: "El clásico sistema de 8 bits que definió la infancia.", price: 35000, stock: 8, image: "/images/FamilyGame.png" },
  { name: "Intellivision", category: "consolas", description: "Consola de 16 bits con innovador controlador.", price: 50000, stock: 3, image: "/images/Intellivision.png" },
  { name: "Joystick Atari", category: "accesorios", description: "Palanca clásica con botón de fuego lateral.", price: 8000, stock: 20, image: "/images/JoystickAtari.png" },
  { name: "Joystick Coleco", category: "accesorios", description: "Controlador ergonómico con palanca central.", price: 9000, stock: 15, image: "/images/JoystickColeco.png" },
  { name: "Joystick Family", category: "accesorios", description: "Joystick compacto de 8 direcciones.", price: 7500, stock: 18, image: "/images/Joystickfamily.png" },
  { name: "Joystick Intellivision", category: "accesorios", description: "Innovador controlador con disco direccional.", price: 8500, stock: 12, image: "/images/JoystickIntelliVision.png" },
];

const team = [
  { name: "Alejandro", role: "Desarrollador Full Stack", linkedinURL: "https://linkedin.com/in/alejandro-dev", fotoURL: "/images/Maniac_Mansion_-_Tentaculo_Verde.png" },
  { name: "María", role: "Diseñadora UX/UI", linkedinURL: "https://linkedin.com/in/maria-design", fotoURL: "/images/Maniac_Mansion_-_Edna.png" },
  { name: "Carlos", role: "Marketing Digital", linkedinURL: "https://linkedin.com/in/carlos-marketing", fotoURL: "/images/Maniac_Mansion_-_Ted.png" },
];

export function SeedPage() {
  const [status, setStatus] = useState("Listo para sembrar");
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      setStatus("Sembrando productos...");
      const prodCol = collection(db, "productos");
      for (const p of products) {
        await addDoc(prodCol, p);
        setStatus(`Sembrando productos... (${products.indexOf(p) + 1}/${products.length})`);
      }
      setStatus("Sembrando equipo...");
      const teamCol = collection(db, "equipo");
      for (const m of team) {
        await addDoc(teamCol, m);
        setStatus(`Sembrando equipo... (${team.indexOf(m) + 1}/${team.length})`);
      }
      setStatus("✅ Seed completado. Ya podés cerrar esta página.");
    } catch (err) {
      console.error("Seed error:", err);
      setStatus("❌ Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "monospace", textAlign: "center" }}>
      <h2>🌱 Seed - Poblar Firestore</h2>
      <p style={{ margin: "20px 0", color: status.includes("❌") ? "red" : status.includes("✅") ? "green" : "#e0e0e0" }}>{status}</p>
      {!loading && !status.includes("✅") && (
        <button onClick={handleSeed} style={{ padding: "12px 24px", fontSize: "16px", cursor: "pointer" }}>
          Ejecutar Seed
        </button>
      )}
    </div>
  );
}

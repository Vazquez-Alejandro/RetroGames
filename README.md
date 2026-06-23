# Retro Games 🎮

E-commerce de productos retro (consolas, juegos y accesorios) desarrollado con React + Firebase.

## Tecnologías

- **React 19** + **Vite**
- **React Router DOM** (navegación SPA)
- **Firebase** (Firestore + Authentication)
- **CSS Modules** (estilos encapsulados)
- **React Icons** (iconografía)
- **React Helmet** (SEO dinámico)
- **Press Start 2P** (tipografía pixel retro)
- **Vercel** (deploy automático)

## Funcionalidades

- Catálogo de productos con filtro por categorías
- Búsqueda en tiempo real por nombre
- Detalle de producto individual
- Carrito de compras con stock sincronizado a Firestore
- Cupones de descuento (aplicables en el carrito)
- Autenticación (login/registro con Firebase Auth)
- Panel admin: CRUD de productos y cupones
- Rutas protegidas según rol (admin/user)
- Diseño responsivo mobile-first
- Paginación de productos
- Efectos retro (scanlines CRT, glitch RGB, neón pulsante)
- SEO con React Helmet

## Instalación local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Vazquez-Alejandro/RetroGames.git
cd RetroGames

# 2. Instalar dependencias
npm install

# 3. Configurar Firebase
# Crear un proyecto en Firebase Console y habilitar:
#   - Firestore Database (modo prueba)
#   - Authentication → Sign-in method → Email/Password
# Copiar la configuración a src/firebase/config.js

# 4. Iniciar servidor de desarrollo
npm run dev
```

## Firebase Setup

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar **Firestore Database** (reglas en modo prueba)
3. Habilitar **Authentication** → Sign-in method → **Email/Password**
4. Crear usuario admin:
   - Authentication → Users → Agregar usuario (`admin@admin.com`)
   - Firestore → colección `usuarios` → documento ID = UID del admin → `{ rol: "admin" }`

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npx vercel --prod` | Deploy a Vercel |

## Estructura del proyecto

```
src/
├── assets/           # Imágenes y recursos
├── components/       # Componentes React
│   ├── Cart/         # Carrito de compras
│   ├── Count/        # Control de cantidad (+/-)
│   ├── Footer/       # Pie de página con equipo
│   ├── GestionCupones/   # CRUD de cupones (admin)
│   ├── GestionProductos/ # CRUD de productos (admin)
│   ├── Header/       # Encabezado con logo
│   ├── Item/         # Tarjeta de producto
│   ├── ItemDetail/   # Detalle de producto
│   ├── ItemList/     # Grilla de productos
│   ├── ItemListContainer/ # Listado con filtros y paginación
│   ├── Layout/       # Layout principal
│   ├── Login/        # Inicio de sesión
│   ├── Nav/          # Navegación responsiva
│   ├── Perfil/       # Perfil de usuario
│   ├── ProtectedRoute/   # Ruta protegida
│   └── Registro/     # Registro de usuario
├── context/          # Contextos (Cart, Auth, Notification)
├── firebase/         # Configuración de Firebase
├── pages/            # Páginas (Home)
├── App.jsx           # Componente principal
├── App.css           # Estilos globales
├── index.css         # Estilos base y animaciones
└── main.jsx          # Punto de entrada
```

## Deploy

El proyecto está deployado en Vercel:

**https://retro-games-five.vercel.app**

Cada push a `main` dispara un nuevo deploy automático.

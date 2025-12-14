import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// --- CONTEXTO GLOBAL ---
import { SessionProvider } from './contexts/SessionContext.jsx'

// --- COMPONENTES ESTRUCTURALES ---
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// --- PÁGINAS (VISTAS) ---
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Logout from './pages/Logout.jsx'
import MisCampanas from './pages/MisCampanas.jsx'
import DetalleCampana from './pages/DetalleCampana.jsx'
import NuevaCampana from './pages/NuevaCampana.jsx'
import ListaJuegos from './pages/ListaJuegos.jsx'
import Perfil from './pages/Perfil.jsx'
import PerfilEditar from './pages/PerfilEditar.jsx'
import Error404 from './pages/Error404.jsx'
import RecuperarCuenta from './pages/RecuperarCuenta.jsx'
import RestablecerContrasenia from './pages/RestablecerContrasenia.jsx'

// --- PÁGINAS CRUD ---
import JuegosNuevo from './pages/JuegosNuevo.jsx'
import JuegosEditar from './pages/JuegosEditar.jsx'
import JuegosDetalle from './pages/JuegosDetalle.jsx'
import EditarCampana from './pages/EditarCampana.jsx' 

// --- PÁGINAS DE EXPLORACIÓN Y COMUNIDAD ---
import ExplorarCampanas from './pages/ExplorarCampanas.jsx' 
import ExplorarJugadores from './pages/ExplorarJugadores.jsx' 
import PerfilPublico from './pages/PerfilPublico.jsx' 

/**
 * Configuración de las Rutas (React Router DOM v6).
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      // --- RUTAS PÚBLICAS  ---
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/registro", element: <Register /> },
      { path: "/recuperar-cuenta", element: <RecuperarCuenta /> },
      { path: "/restablecer-contrasenia/:token", element: <RestablecerContrasenia /> },

      // --- RUTAS PRIVADAS  ---
      
      // Gestión de Perfil Personal
      { path: "/perfil", element: <ProtectedRoute element={<Perfil />} /> },
      { path: "/perfil/editar", element: <ProtectedRoute element={<PerfilEditar />} /> },

      // Perfil Público de Otros Jugadores (Hoja de Aventurero)
      { path: "/jugadores/:id", element: <ProtectedRoute element={<PerfilPublico />} /> },

      // Gestión de Campañas (CRUD)
      { path: "/campanas", element: <ProtectedRoute element={<MisCampanas />} /> },
      { path: "/campanas/nueva", element: <ProtectedRoute element={<NuevaCampana />} /> },
      { path: "/campanas/:id", element: <ProtectedRoute element={<DetalleCampana />} /> },
      { path: "/campanas/editar/:id", element: <ProtectedRoute element={<EditarCampana />} /> }, 

      // Biblioteca de Juegos (CRUD)
      { path: "/juegos", element: <ProtectedRoute element={<ListaJuegos />} /> },
      { path: "/juegos/nuevo", element: <ProtectedRoute element={<JuegosNuevo />} /> }, 
      { path: "/juegos/:id", element: <ProtectedRoute element={<JuegosDetalle />} /> }, 
      { path: "/juegos/editar/:id", element: <ProtectedRoute element={<JuegosEditar />} /> }, 

      // --- RUTAS DE EXPLORACIÓN (Comunidad) ---
      { path: "/explorar/campanas", element: <ProtectedRoute element={<ExplorarCampanas />} /> }, 
      { path: "/explorar/jugadores", element: <ProtectedRoute element={<ExplorarJugadores />} /> }, 

      // Salir
      { path: "/logout", element: <Logout /> }
    ],
  }
])

/**
 * Renderizado Principal.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>
)
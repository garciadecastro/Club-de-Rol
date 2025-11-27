import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// --- CONTEXTO GLOBAL ---
import { SessionProvider } from './contexts/SessionContext.jsx'

// --- COMPONENTES ESTRUCTURALES ---
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

// --- PÁGINAS ---
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Logout from './pages/Logout.jsx'
import MisCampanas from './pages/MisCampanas.jsx'
import DetalleCampana from './pages/DetalleCampana.jsx'
import NuevaCampana from './pages/NuevaCampana.jsx'
import ListaJuegos from './pages/ListaJuegos.jsx'
import Perfil from './pages/Perfil.jsx'
import Error404 from './pages/Error404.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/registro", element: <Register /> },

      // --- RUTAS PRIVADAS ---
      { path: "/perfil", element: <ProtectedRoute element={<Perfil />} /> },
      { path: "/campanas", element: <ProtectedRoute element={<MisCampanas />} /> },
      { path: "/campanas/nueva", element: <ProtectedRoute element={<NuevaCampana />} /> },
      { path: "/campanas/:id", element: <ProtectedRoute element={<DetalleCampana />} /> },
      { path: "/juegos", element: <ProtectedRoute element={<ListaJuegos />} /> },

      { path: "/logout", element: <Logout /> }
    ],
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>
)

# CLUB DE ROL - GESTIÓN DE AVENTURAS ÉPICAS

Este proyecto es una aplicación Full Stack desarrollada bajo el paradigma **SOA (Service-Oriented Architecture)**, utilizando React en el Frontend y Node.js/Express con MongoDB en el Backend. Su objetivo principal es ofrecer una plataforma para gestionar campañas de rol, administrar recursos de juego y facilitar la interacción entre jugadores.

---

## Cumplimiento de Requisitos (Entrega Final)

Este proyecto abarca funcionalidades avanzadas de gestión de datos, seguridad y relaciones entre entidades:

| Característica | Descripción Técnica |

| **Autenticación (JWT)** | Uso de JSON Web Tokens (JWT) para proteger rutas privadas y mantener la sesión del usuario. |
| **Seguridad & Encriptación** | Contraseñas protegidas mediante `bcrypt`. Middleware de seguridad para validar tokens antes de acceder a recursos sensibles. |
| **Arquitectura SOA** | Backend estructurado en capas: **Router** (Rutas), **Controller** (Lógica HTTP), **Service** (Lógica de Negocio) y **Middleware**. |
| **Gestión de Campañas** | **CRUD Completo**: Crear, Leer, Editar y Eliminar campañas. Sistema para **añadir jugadores** a campañas activas (unirse a la aventura). |
| **Perfiles de Usuario** | Visualización de **Perfiles Públicos** de otros jugadores y gestión privada del propio perfil. |
| **Recuperación de Cuenta** | Flujo completo de **Recuperación de Contraseña** vía Email (`Nodemailer`) con generación de tokens temporales de un solo uso. |
| **Estado Global** | Uso de **Context API** (`SessionContext`) y **Custom Hooks** para manejar la sesión y los datos en el Frontend. |
| **Base de Datos** | MongoDB con relaciones entre colecciones: `Campañas` vinculadas a `Jugadores` y `Juegos`. |

---

## Arquitectura y Tecnologías

El proyecto se estructura en dos repositorios principales que se comunican a través de una API REST.

### Backend (`/back`)
* **Runtime:** Node.js
* **Framework:** Express (ES Modules)
* **Base de Datos:** MongoDB (Driver nativo y MongoDB Atlas)
* **Librerías Clave:** `jsonwebtoken`, `bcrypt`, `nodemailer`, `cors`.

### Frontend (`/react-router`)
* **Framework:** React (Vite)
* **Routing:** React Router DOM
* **Estilo:** Tailwind CSS (Diseño "Dark Fantasy" con paleta Slate/Amber)
* **Comunicación:** `fetch` con servicios modularizados (`api.services.js`).

---

## Instalación y Puesta en Marcha

El proyecto está pre-configurado para funcionar inmediatamente tras la instalación de dependencias, sin necesidad de configurar variables de entorno manualmente.

### 1. Instalación de Dependencias

Ejecuta los siguientes comandos desde la raíz del proyecto para instalar las librerías necesarias tanto en el servidor como en el cliente:

# Instalar dependencias del Backend
cd back
npm install

# Instalar dependencias del Frontend
cd ../react-router
npm install

### 2. Ejecución
Es necesario tener dos terminales abiertas simultáneamente para levantar ambos servicios:

# Terminal 1 (Backend):
cd back
npm run dev
# El servidor iniciará en el puerto 2025 y conectará automáticamente a MongoDB Atlas.

# Terminal 2 (Frontend):
cd react-router
npm run dev
# Abrir http://localhost:5173 en el navegador.

### 3. Funcionalidades Destacadas
# Unirse a Campañas
Los usuarios pueden explorar campañas creadas por otros Directores de Juego y solicitar unirse a ellas. El sistema actualiza la base de datos vinculando el ID del jugador a la lista de participantes de la campaña.

# Perfiles Públicos
Al hacer clic en el nombre de un jugador (en una campaña o comentario), se accede a una vista pública de su perfil (/jugadores/:id), mostrando su información básica sin comprometer datos sensibles como su email o contraseña.

# Recuperación de Contraseña
Si un usuario olvida su clave:

Solicita la recuperación desde el Login.

El Backend genera un token temporal (1 hora de validez) y envía un correo con un enlace único a su email.

El usuario accede al enlace, define su nueva contraseña y el sistema la actualiza encriptada en la base de datos.

Autor: Carlos García de Castro Materia: Aplicaciones Híbridas - Final
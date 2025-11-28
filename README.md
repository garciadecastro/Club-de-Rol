# CLUB DE ROL - GESTIÓN DE AVENTURAS ÉPICAS

Este proyecto es una aplicación Full Stack desarrollada bajo el paradigma **SOA (Service-Oriented Architecture)**, utilizando React en el Frontend y Node.js/Express con MongoDB en el Backend, con el objetivo de gestionar las campañas, recursos y miembros de un club de rol.

---

## cumplimiento de Requisitos (Segundo Parcial)

| **Autenticación (JWT)** | [cite_start]Uso de JSON Web Tokens (JWT) para proteger todas las rutas privadas[cite: 1].
| **Encriptación** | [cite_start]Contraseñas protegidas mediante `bcrypt`
| **Arquitectura de Capas** | [cite_start]Backend dividido en Router, Controller, Service y Middleware
| **Middleware de Autorización**| [cite_start]`validateToken` verifica la sesión JWT antes de acceder a datos sensible
| **CRUD & Data** | [cite_start]CRUD completo (Crear, Leer, Editar, Eliminar) sobre **Campañas** y **Juegos** 
| **Entidades Relacionadas** | [cite_start]Modelos `Campañas`, `Juegos`, `Jugadores`, `Partidas`, `Comentarios`
| **Estado Global** | [cite_start]Uso de **Context API** y **Custom Hooks** (`useCampanas`, `useJuegos`) para manejar el estado del usuario[cite: 1]. 
| **Validación** | [cite_start]Validación de formularios en Frontend y Backend (Middleware y YUP Schemas)
| **Funcionalidad Extra**| [cite_start]Flujo completo de **Recuperación de Contraseña** vía email (`Nodemailer`)
| **Privacidad**| [cite_start]Las campañas son gestionadas de manera privada por el usuario autenticado[cite: 1]

## Arquitectura y Tecnologías

El proyecto se estructura en dos repositorios/carpetas principales que se comunican a través de una API REST protegida.

| **`back`** | Node.js / Express (ESM) | API REST, Conexión a MongoDB, Encriptación, JWT, Manejo de `nodemailer`. |
| **`react-router`** | React (Vite) / React Router DOM | Interfaz de usuario, Context API (`SessionContext`), Manejo de formularios y peticiones (`api.services.js`). |
| **Estilo** | Tailwind CSS | Diseño **Neomedieval Moderno** (Slate/Amber). |


## Configuración e Instalación

### 1. Claves de Entorno (`.env`)

Cree un archivo llamado **`.env`** en la carpeta **`back/`** con las siguientes variables esenciales:

```env
# CRÍTICO PARA EL SERVIDOR
PORT=2025
MONGO_URI=mongodb+srv://user:pass@cluster.net/DB_NAME?retryWrites=true&w=majority
DB_NAME=AH20232CP1
JWT_SECRET=tu_clave_secreta_unica

# CONFIGURACIÓN DE EMAIL (Obligatorio para la recuperación de contraseña)
EMAIL_USER=tu_correo_de_envio@gmail.com
EMAIL_PASS=tu_app_password_de_16_caracteres # Usar una App Password de Google
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_SECURE=true

# PASO 1: INSTALAR DEPENDENCIAS (UNA VEZ)
cd back/
npm install
cd ../react-router/
npm install

# ----------------------------------------

# TERMINAL 1: INICIAR BACKEND (API)
cd back/
npm run dev 

# TERMINAL 2: INICIAR FRONTEND (REACT)
cd react-router/
npm run dev 
# Abrir http://localhost:5173 en el navegador.
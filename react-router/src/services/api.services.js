//Archivo: react-router/src/services/api.services.js

export async function call({ uri, method = "GET", body = undefined }) {

    // Recuperamos el token. Usamos try/catch por si el localStorage tiene basura que no sea JSON.
    let token = null;
    try {
        const raw = localStorage.getItem("token");
        token = raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.error("Error al leer el token", error);
        token = null;
    }

    const headers = {
        "Content-Type": "application/json",
    };

    // Agregar Authorization solo si existe el token
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`http://localhost:2025/api/${uri}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined
    })
    .then(async response => {
        // Manejo de error 401 (Token vencido o falso)
        if (response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario"); // limpiamos el usuario
            window.location.href = '/login'; // Fuerza la recarga hacia el login
        }

        
        // Verificamos si hay contenido antes de parsear.
        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (!response.ok) {
            // Lanzamos el error con el mensaje que viene del backend o uno genérico
            throw new Error(data.message || data.error || "Error en la petición");
        }

        return data;
    })
    .catch(err => {
        // capturamos tanto errores de red (servidor apagado) como los throw de arriba
        console.error("Error en servicio:", err.message);
        throw new Error(err.message || "Error de conexión con el servidor");
    });
}
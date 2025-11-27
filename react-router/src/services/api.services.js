export function call({ uri, method = "GET", body = undefined }) {

    const raw = localStorage.getItem("token");
    const token = raw ? JSON.parse(raw) : null;

    const headers = {
        "Content-Type": "application/json",
    };

    // Agregar Authorization solo si existe
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return fetch(`http://localhost:2025/api/${uri}`, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : undefined
    })
    .then(response => {
        if (response.status === 401) {
            localStorage.removeItem("token");
            // Redirección opcional al login
        }
        return response.json()
            .then(data => {
                if (!response.ok) {
                    throw new Error(data.message || data.error || "Error en la petición");
                }
                return data;
            });
    })
    .catch(err => {
        throw new Error(err.message || "Error de conexión con el servidor");
    });
}

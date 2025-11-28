//Archivo: react-router/src/hooks/useCampanas.jsx
import { useEffect, useState } from "react";
import { getCampanas, getCampanaById, getCampanasPublicas } from "../services/campanas.services"; 

/**
 * Hook para obtener la LISTA de campañas del usuario.
 * Maneja automáticamente los estados de carga (loading) y error.
 */
export function useCampanas() {
    const [campanas, setCampanas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelado = false; // Flag para evitar actualizar estado si el componente murió

        async function cargar() {
            try {
                const data = await getCampanas(); // Llama al servicio PRIVADO (filtrado por usuario)
                if (!cancelado) setCampanas(data);
            } catch (err) {
                if (!cancelado) setError(err.message);
            } finally {
                if (!cancelado) setLoading(false);
            }
        }

        cargar();

        // Función de limpieza (cleanup)
        return () => { cancelado = true };
    }, []);

    return { campanas, loading, error };
}

/**
 * Hook para obtener TODAS las campañas públicas del club.
 */
export function useCampanasPublicas() {
    const [campanas, setCampanas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelado = false;

        async function cargar() {
            try {
                const data = await getCampanasPublicas(); // Llama al servicio PÚBLICO (sin filtro de usuario)
                if (!cancelado) setCampanas(data);
            } catch (err) {
                if (!cancelado) setError(err.message);
            } finally {
                if (!cancelado) setLoading(false);
            }
        }

        cargar();
        return () => { cancelado = true };
    }, []);

    return { campanas, loading, error };
}


/**
 * Hook personalizado para obtener el DETALLE de una campaña específica.
 * @param {string} id - El ID de la campaña a buscar.
 */
export function useCampana(id) {
    const [campana, setCampana] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        let cancelado = false;

        async function cargar() {
            try {
                setLoading(true);
                const data = await getCampanaById(id);
                if (!cancelado) setCampana(data);
            } catch (err) {
                if (!cancelado) setError(err.message);
            } finally {
                if (!cancelado) setLoading(false);
            }
        }

        cargar();

        return () => { cancelado = true };
    }, [id]); // Se re-ejecuta si cambia el ID

    return { campana, loading, error };
}
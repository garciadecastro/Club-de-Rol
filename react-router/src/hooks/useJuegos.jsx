//Archivo: react-router/src/hooks/useJuegos.jsx
import { useEffect, useState } from "react";
import { getJuegos, getJuegoById } from "../services/juegos.services";
import { getJugadoresPublicos } from "../services/jugadores.services"; 


/**
 * Hook para obtener la biblioteca completa de juegos disponibles.
 */
export function useJuegos() {
    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelado = false;

        async function cargar() {
            try {
                const data = await getJuegos();
                if (!cancelado) setJuegos(data);
            } catch (err) {
                if (!cancelado) setError(err.message);
            } finally {
                if (!cancelado) setLoading(false);
            }
        }

        cargar();

        return () => { cancelado = true };
    }, []);

    return { juegos, loading, error };
}

/**
 * Hook para obtener un solo juego por su ID.
 */
export function useJuego(id) {
    const [juego, setJuego] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        let cancelado = false;

        async function cargar() {
            try {
                setLoading(true);
                const data = await getJuegoById(id);
                if (!cancelado) setJuego(data);
            } catch (err) {
                if (!cancelado) setError(err.message);
            } finally {
                if (!cancelado) setLoading(false);
            }
        }

        cargar();

        return () => { cancelado = true };
    }, [id]);

    return { juego, loading, error };
}


/**
 * Hook para obtener la lista pública de todos los jugadores.
 */
export function useJugadoresPublicos() {
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCanceled = false;
        
        async function loadData() {
            try {
                // Llama al servicio que consulta el endpoint /api/jugadores/publicos
                const data = await getJugadoresPublicos(); 
                
                if (!isCanceled) {
                    setJugadores(data); 
                }
            } catch (err) {
                if (!isCanceled) {
                    setError(err.message);
                }
            } finally {
                if (!isCanceled) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => { isCanceled = true };
    }, []);

    return { jugadores, loading, error };
}
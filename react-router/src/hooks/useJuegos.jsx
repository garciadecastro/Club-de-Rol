import { useEffect, useState } from "react";
import { getJuegos, getJuegoById } from "../services/juegos.services";

// HOOK 1 — Lista de juegos
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

// HOOK 2 — Juego individual
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

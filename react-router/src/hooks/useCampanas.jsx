import { useEffect, useState } from "react";
import { getCampanas, getCampanaById } from "../services/campanas.services";

// HOOK — Todas las campañas del usuario
export function useCampanas() {
    const [campanas, setCampanas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelado = false;

        async function cargar() {
            try {
                const data = await getCampanas();
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

// HOOK — Campaña individual
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
    }, [id]);

    return { campana, loading, error };
}

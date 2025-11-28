import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Activity from "../components/Activity";
import { restablecerContrasenia } from "../services/auth.services";

const RestablecerContrasenia = () => {
    const [pass, setPass] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const { token } = useParams();  

    const handleRestablecer = () => {
        setError("");

        restablecerContrasenia(token, pass) 
            .then(() => setSuccess(true))
            .catch(() => {
                setError("No se pudo restablecer. El enlace puede haber expirado.");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dungeon-dark p-4">
            <div className="bg-dungeon-light border border-gold-600/30 p-8 rounded-lg shadow-2xl max-w-md w-full text-center">

                <h2 className="text-2xl font-cinzel font-bold text-gold-500 mb-6">
                    Nueva Contraseña
                </h2>

                {success && (
                    <Activity mode="visible">
                        <div className="bg-green-900/50 border border-green-500 text-green-200 p-4 rounded mb-4">
                            <p className="mb-2">¡Contraseña restaurada con éxito!</p>
                            <Link to="/login" className="font-bold text-gold-500 hover:underline">
                                Ir a Iniciar Sesión
                            </Link>
                        </div>
                    </Activity>
                )}

                {!success && (
                    <div className="space-y-4">

                        <input
                            type="password"
                            className="w-full p-3 bg-slate-900 border border-gold-600/30 rounded text-parchment focus:border-gold-500 outline-none"
                            placeholder="Escribe tu nueva contraseña"
                            onChange={(e) => setPass(e.target.value)}
                        />

                        {error && (
                            <Activity mode="visible">
                                <p className="text-red-400 text-sm">{error}</p>
                            </Activity>
                        )}

                        <button
                            onClick={handleRestablecer}
                            className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-dungeon-dark font-bold rounded transition-colors"
                        >
                            Restablecer
                        </button>

                    </div>
                )}

            </div>
        </div>
    );
};

export default RestablecerContrasenia;

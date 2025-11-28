//Archivo: react-router/src/pages/PerfilEditar.jsx
import React, { useState } from "react";
import { useUsuario, useLogout } from "../contexts/SessionContext";
import { actualizarPerfil, eliminarPerfil } from "../services/jugadores.services";
import { Link } from "react-router-dom";

/**
 * Página: Editar Perfil
 * Permite cambiar nombre, email, contraseña o eliminar la cuenta.
 */
const PerfilEditar = () => {
    const usuario = useUsuario();
    const logout = useLogout();

    const [nombre, setNombre] = useState(usuario?.nombre || "");
    const [email, setEmail] = useState(usuario?.email || "");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleGuardar = async (e) => {
        e.preventDefault();
        setMsg("");
        setError("");

        try {
            const datos = { nombre, email };
            if (password.trim() !== "") datos.password = password;

            const actualizado = await actualizarPerfil(usuario._id, datos);

            setMsg("Tu ficha de personaje ha sido actualizada.");

            // Actualizamos la sesión local con los nuevos datos
            const nuevoUsuario = { ...usuario, ...actualizado };
            localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
            
            
            setTimeout(() => window.location.href = "/perfil", 1500);

        } catch (err) {
            setError(err.message);
        }
    };

    const handleEliminar = async () => {
        if (!confirm("⚠️ ¿ESTÁS SEGURO?\n\nEliminar tu cuenta borrará permanentemente tus campañas y personajes. Esta acción es irreversible como la muerte verdadera.")) return;
        
        try {
            await eliminarPerfil(usuario._id);
            logout();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-8 animate-fade-in">
            
            {/* BOTÓN VOLVER */}
            <Link to="/perfil" className="group text-slate-400 hover:text-amber-400 mb-6 inline-flex items-center gap-2 transition-all">
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> 
                <span className="uppercase tracking-widest text-xs font-bold">Volver a la Hoja de Personaje</span>
            </Link>

            <div className="bg-slate-900 border border-amber-800/40 rounded-xl shadow-2xl overflow-hidden">
                
                {/* Cabecera */}
                <div className="p-6 border-b border-amber-900/30 bg-slate-950/50">
                    <h1 className="text-2xl font-bold font-serif text-amber-500 tracking-tight flex items-center gap-3">
                        <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Editar Datos del Aventurero
                    </h1>
                </div>

                <div className="p-6 md:p-8">
                    {/* Mensajes de Feedback */}
                    {msg && (
                        <div className="bg-green-900/20 border border-green-500/30 text-green-200 p-4 rounded-lg mb-6 shadow-inner flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            {msg}
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-lg mb-6 shadow-inner flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleGuardar}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nombre */}
                            <div className="group">
                                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Nombre del Jugador</label>
                                <input
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="group">
                                <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">Correo Arcano</label>
                                <input
                                    type="email"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div className="group pt-4 border-t border-slate-800">
                            <label className="block text-amber-500/80 mb-2 text-xs font-bold uppercase tracking-widest">
                                Cambiar Contraseña <span className="text-slate-500 normal-case font-normal ml-2">(Dejar en blanco para mantener la actual)</span>
                            </label>
                            <input
                                type="password"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Botón Guardar */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-amber-700 to-amber-600 text-amber-50 font-bold rounded-lg hover:from-amber-600 hover:to-amber-500 transition-all shadow-lg border border-amber-500/30 flex justify-center items-center gap-2 transform hover:-translate-y-0.5"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                            Guardar Cambios
                        </button>
                    </form>
                </div>

                {/* Zona de Peligro */}
                <div className="bg-red-950/20 p-6 border-t border-red-900/30 mt-2">
                    <h3 className="text-red-400 font-bold text-sm uppercase tracking-widest mb-2">Zona de Peligro</h3>
                    <p className="text-slate-400 text-xs mb-4">Esta acción no se puede deshacer. Se eliminarán todos tus datos.</p>
                    
                    <button
                        onClick={handleEliminar}
                        className="w-full py-3 bg-transparent border border-red-800 text-red-500 hover:bg-red-900/30 hover:text-red-400 font-bold rounded-lg transition-all text-sm flex justify-center items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Eliminar Cuenta Definitivamente
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PerfilEditar;
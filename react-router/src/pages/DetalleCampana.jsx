//Archivo: react-router/src/pages/DetalleCampana.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom' 
import { useCampana } from '../hooks/useCampanas'
import { deleteCampana, expulsarJugador } from '../services/campanas.services' // IMPORTANTE: expulsarJugador
import { useJuegos } from '../hooks/useJuegos' 
import { getJugadoresPublicos } from '../services/jugadores.services'
import { useUsuario } from '../contexts/SessionContext'

const DetalleCampana = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const usuario = useUsuario()
    
    // Necesitamos setCampana para actualizar la UI tras expulsar sin recargar
    // Si tu hook useCampana no retorna setCampana, tendrás que usar window.location.reload()
    const { campana, loading, error, setCampana } = useCampana(id) 
    const { juegos } = useJuegos()
    const [allPlayers, setAllPlayers] = useState([])

    useEffect(() => {
        getJugadoresPublicos()
            .then(setAllPlayers)
            .catch(err => console.error("Error directorio:", err))
    }, [])

    const targetJuegoId = campana?.juego_id || campana?.juegoAsociado;
    const juegoAsociado = juegos.find(j => j._id === targetJuegoId);
    const idsJugadores = Array.isArray(campana?.jugadores) ? campana.jugadores : [];
    const miembrosCampaña = allPlayers.filter(p => idsJugadores.includes(p._id));
    const soyElMaster = usuario?._id === campana?.creador_id;

    // --- LÓGICA DE EXPULSIÓN ---
    const handleExpulsar = async (idJugador, nombreJugador) => {
        if (!confirm(`¿Expulsar a ${nombreJugador} de la mesa?`)) return;
        try {
            await expulsarJugador(id, idJugador);
            // Actualizamos visualmente si el hook lo permite, o recargamos
            if (setCampana) {
                const nuevos = campana.jugadores.filter(uid => uid !== idJugador);
                setCampana({ ...campana, jugadores: nuevos });
            } else {
                window.location.reload();
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    }

    const handleDelete = async () => {
        if (!confirm(`⚠️ ¿Archivar "${campana.titulo}"?`)) return;
        try {
            await deleteCampana(id);
            navigate("/campanas");
        } catch (err) { alert(err.message); }
    }

    if (loading) return <div className="flex justify-center h-[50vh] items-center text-amber-500 animate-pulse">Descifrando...</div>
    if (error) return <div className="p-8 text-center text-red-400">{error}</div>
    if (!campana || !campana._id) return <div className="p-10 text-center text-slate-500">Campaña perdida.</div>

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-fade-in">
            <Link to="/campanas" className="group text-slate-400 hover:text-amber-400 mb-8 inline-flex items-center gap-2 transition-all">
                <span>&larr;</span> <span className="uppercase tracking-widest text-xs font-bold">Volver al mapa</span>
            </Link>
            
            <div className="bg-slate-900 border border-amber-800/40 rounded-xl overflow-hidden shadow-lg">
                {/* CABECERA */}
                <div className="relative p-8 md:p-10 border-b border-amber-900/30">
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="px-3 py-1 bg-amber-900/40 text-amber-300 border border-amber-700/50 rounded text-xs font-bold uppercase tracking-wider shadow-inner">
                                    {juegoAsociado ? juegoAsociado.sistema : campana.sistema}
                                </span>
                                {campana.fecha_creacion && <span className="text-xs text-slate-500 font-mono">{new Date(campana.fecha_creacion).toLocaleDateString()}</span>}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-amber-500 font-serif tracking-tight">{campana.titulo}</h1>
                            {juegoAsociado && (
                                <p className="text-sm mt-3 text-slate-300">Aventura de <Link to={`/juegos/editar/${juegoAsociado._id}`} className="text-amber-400 hover:underline font-bold">{juegoAsociado.nombre}</Link></p>
                            )}
                        </div>
                        {soyElMaster && (
                            <div className="flex flex-col gap-2 items-end">
                                <Link to={`/campanas/editar/${id}`} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-lg border border-amber-900/50 text-sm">✏️ Editar</Link>
                                <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-800/50 text-red-400 font-bold rounded-lg border border-red-900 text-sm">🗑️ Archivar</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* DESCRIPCIÓN */}
                <div className="p-8 md:p-10 bg-slate-950/30">
                    <div className="text-amber-50/80 text-lg leading-relaxed whitespace-pre-line font-serif pl-4 border-l-2 border-amber-900/50">
                        {campana.descripcion || "Historia no escrita..."}
                    </div>
                </div>

                {/* MIEMBROS */}
                <div className="bg-slate-950 p-8 md:p-10 border-t border-amber-900/30">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-amber-500 font-serif">🛡️ Miembros ({miembrosCampaña.length + 1})</h2>
                        {soyElMaster && (
                            <Link to={`/campanas/editar/${id}`} className="px-5 py-2.5 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 text-white font-bold rounded-lg border border-amber-500/50 transition-all">➕ Invitar</Link>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center gap-4 p-4 bg-slate-900 border border-amber-800/30 rounded-lg shadow-sm">
                            <div className="w-12 h-12 rounded-full bg-amber-900/30 border border-amber-600/50 flex items-center justify-center text-2xl">👑</div>
                            <div><p className="text-amber-100 font-bold">Dungeon Master</p><p className="text-xs text-amber-500 uppercase">Narrador</p></div>
                        </div>

                        {miembrosCampaña.length > 0 ? miembrosCampaña.map(jugador => (
                            <div key={jugador._id} className="relative group flex items-center gap-4 p-4 bg-slate-900 border border-slate-700/50 rounded-lg shadow-sm hover:border-slate-500 transition-colors">
                                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xl text-slate-400">👤</div>
                                <div className="overflow-hidden flex-1">
                                    <p className="text-slate-200 font-bold truncate">{jugador.nombre}</p>
                                    <p className="text-xs text-slate-500 truncate">{jugador.email}</p>
                                </div>
                                {soyElMaster && (
                                    <button onClick={() => handleExpulsar(jugador._id, jugador.nombre)} className="absolute top-2 right-2 p-1 text-slate-600 hover:text-red-500 hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-all" title="Expulsar">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                )}
                            </div>
                        )) : (
                            <div className="flex items-center justify-center p-4 border-2 border-dashed border-slate-800 rounded-lg text-slate-600 italic text-sm">El grupo está vacío...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetalleCampana
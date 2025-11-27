import { useState } from "react"
import Activity from '../components/Activity'
import { recuperarCuenta } from "../services/auth.services"
import { Link } from "react-router-dom"

const RecuperarCuenta = () => {
    const [email, setEmail] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const handleRecuperar = () => {
        setError("")

        recuperarCuenta(email)
            .then(() => {
                setSuccess(true)
            })
            .catch((err) => {
                console.error(err)
                setError("No se pudo enviar el correo. Verifica el email.")
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-dungeon-dark p-4">
            <div className="bg-dungeon-light border border-gold-600/30 p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
                
                <h2 className="text-2xl font-cinzel font-bold text-gold-500 mb-4">
                    Recuperar Acceso
                </h2>

                <Activity mode={success ? 'visible' : 'hidden'}>
                    <div className="bg-green-900/50 border border-green-500 text-green-200 p-3 rounded mb-4">
                        <p>Pergamino de recuperación enviado correctamente.</p>
                        <Link to="/login" className="underline text-gold-500 hover:text-gold-400">
                            Volver al portal
                        </Link>
                    </div>
                </Activity>

                <Activity mode={error ? 'visible' : 'hidden'}>
                    <p className="text-red-400 mb-4">{error}</p>
                </Activity>

                {!success && (
                    <div className="space-y-4">
                        <p className="text-parchment text-sm">
                            Introduce tu correo para recibir un enlace mágico de recuperación.
                        </p>

                        <input
                            type="text"
                            className="w-full p-3 bg-slate-900 border border-gold-600/30 rounded text-parchment focus:border-gold-500 outline-none"
                            placeholder="tu@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            onClick={handleRecuperar}
                            className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-dungeon-dark font-bold rounded transition-colors"
                        >
                            Enviar Hechizo
                        </button>

                        <div className="mt-4">
                            <Link to="/login" className="text-gold-500/70 hover:text-gold-500 text-sm">
                                Cancelar
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RecuperarCuenta

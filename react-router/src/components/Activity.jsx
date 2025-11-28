//Archivo: react-router/src/components/Activity.jsx
import React from 'react'

/**
 * Componente contenedor que controla la visibilidad de su contenido.
 * Se utiliza para envolver elementos que deben aparecer o desaparecer dinámicamente.
 * @param {string} mode - Controla el estado. Si es 'visible', se muestra.
 * @param {ReactNode} children - El contenido HTML/React que va adentro.
 */
const Activity = ({ mode, children }) => {
    // Si el modo no es 'visible', cancelamos el renderizado devolviendo null
    if (mode !== 'visible') return null
    
    return (
        <div className="animate-fade-in my-2">
            {children}
        </div>
    )
}

export default Activity
import React from 'react'

const Activity = ({ mode, children }) => {
    // Si el modo no es 'visible', no renderizamos nada
    if (mode !== 'visible') return null
    
    return (
        <div className="animate-fade-in my-2">
            {children}
        </div>
    )
}

export default Activity
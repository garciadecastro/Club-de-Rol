export function createPage(titulo, contenido){
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<title>'+titulo+'</title>'
    // Puedes agregar estilos CSS básicos aquí si quieres
    html += '<style>body{font-family: sans-serif; padding: 20px;} a{text-decoration: none; color: blue;} ul{list-style: none; padding: 0;}</style>'
    html += '</head><body>'
    
    // ADAPTACIÓN: Menú de navegación apuntando a JUEGOS
    html += '<nav>'
    html += '<a href="/juegos" >Lista de Juegos</a> | '
    html += '<a href="/juegos/nuevo" >Nuevo Juego</a>'
    html += '</nav>'
    
    html += `<h1>${titulo}</h1>`
    html += contenido
    html += "</body></html>"

    return html
}

// ADAPTACIÓN: Función para listar JUEGOS en lugar de productos
export function createJuegosList(juegos){
    let html = "<ul>"
    juegos.forEach( juego => {
        // Usamos tus campos: nombre, editorial, precio
        html += `<li>${juego.nombre} - ${juego.editorial} - $${juego.precio}</li>`
    } )  
    html += "</ul>"

    return html
}
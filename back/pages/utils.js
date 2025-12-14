export function createPage(titulo, contenido){
    let html = ""
    html += '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<title>'+titulo+'</title>'
 
    html += '<style>body{font-family: sans-serif; padding: 20px;} a{text-decoration: none; color: blue;} ul{list-style: none; padding: 0;}</style>'
    html += '</head><body>'
    
   
    html += '<nav>'
    html += '<a href="/juegos" >Lista de Juegos</a> | '
    html += '<a href="/juegos/nuevo" >Nuevo Juego</a>'
    html += '</nav>'
    
    html += `<h1>${titulo}</h1>`
    html += contenido
    html += "</body></html>"

    return html
}

export function createJuegosList(juegos){
    let html = "<ul>"
    juegos.forEach( juego => {
        
        html += `<li>${juego.nombre} - ${juego.editorial} - $${juego.precio}</li>`
    } )  
    html += "</ul>"

    return html
}
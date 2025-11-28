//Archivo: back/views/juegos.views.js
import { createPage } from "../pages/utils.js";

/**
 * Genera la página con la lista de todos los juegos.
 * Incluye enlaces para Ver Detalle, Editar y Borrar cada uno.
 */
export function createJuegosListPage(juegos) {
  let html = "<h1>Lista de Juegos</h1>";
  html += "<ul>";
  juegos.forEach((juego) => {
    html += `<li>
        <strong>${juego.nombre}</strong> (${juego.editorial}) - $${juego.precio}
        <a href="/juegos/${juego._id}">Ver</a> | 
        <a href="/juegos/editar/${juego._id}">Editar</a> | 
        <a href="/juegos/borrar/${juego._id}">Borrar</a>
      </li>`;
  });
  html += "</ul>";
  html += `<a href="/juegos/nuevo">Agregar Nuevo Juego</a>`;

  return createPage("Lista de Juegos", html);
}

/**
 * Muestra el detalle completo de un juego específico.
 */
export function createDetailPage(juego) {
  let html = "";
  html += "<ul>";
  html += `<li><strong>Nombre:</strong> ${juego.nombre}</li>`;
  html += `<li><strong>Editorial:</strong> ${juego.editorial}</li>`;
  html += `<li><strong>Precio:</strong> $${juego.precio}</li>`;
  html += `<li><strong>Año:</strong> ${juego.year}</li>`;
  html += `<li><strong>Categoría:</strong> ${juego.categoria}</li>`;
  if(juego.imagen) {
      html += `<li><img src="${juego.imagen}" alt="${juego.nombre}" style="max-width:200px"></li>`;
  }
  html += "</ul>";
  html += `<a href="/juegos">Volver a la lista</a>`;
  
  return createPage(juego.nombre, html);
}

/**
 * Página de error simple cuando no existe el juego.
 */
export function errorPage() {
  let html = "";
  html += "<h2>No se encontró el juego buscado</h2>";
  html += `<a href="/juegos">Volver</a>`;
  return createPage("Error 404", html);
}

/**
 * Formulario HTML para crear un juego nuevo.
 * Envía los datos por POST a /juegos/nuevo.
 */
export function formularioNuevoJuego(){
  let html = "<form action='/juegos/nuevo' method='post' >";
  html += "<div><label>Nombre:</label> <input type='text' name='nombre' required /></div>";
  html += "<div><label>Editorial:</label> <input type='text' name='editorial' required /></div>";
  html += "<div><label>Precio:</label> <input type='number' name='precio' required /></div>";
  html += "<div><label>Año:</label> <input type='number' name='year' required /></div>";
  html += "<div><label>Categoría:</label> <input type='text' name='categoria' required /></div>";
  html += "<div><label>Imagen URL:</label> <input type='text' name='imagen' /></div>";
  html += "<div><input type='submit' value='Guardar Juego'/></div>";
  html += "</form>"
  html += `<a href="/juegos">Cancelar</a>`;
  
  return createPage("Nuevo Juego", html);
}

/**
 * Formulario pre-llenado para editar un juego existente.
 */
export function formularioEditarJuego(juego){
  let html = `<form action='/juegos/editar/${juego._id}' method='post' >`;
  html += `<div><label>Nombre:</label> <input type='text' name='nombre' value="${juego.nombre}" required /></div>`;
  html += `<div><label>Editorial:</label> <input type='text' name='editorial' value="${juego.editorial}" required /></div>`;
  html += `<div><label>Precio:</label> <input type='number' name='precio' value="${juego.precio}" required /></div>`;
  html += `<div><label>Año:</label> <input type='number' name='year' value="${juego.year}" required /></div>`;
  html += `<div><label>Categoría:</label> <input type='text' name='categoria' value="${juego.categoria}" required /></div>`;
  html += `<div><label>Imagen URL:</label> <input type='text' name='imagen' value="${juego.imagen || ''}" /></div>`;
  html += "<div><input type='submit' value='Guardar Cambios'/></div>";
  html += "</form>"
  html += `<a href="/juegos">Cancelar</a>`;
  
  return createPage("Editar Juego", html);
}

/**
 * Pantalla de confirmación antes de borrar.
 */
export function formularioBorrarJuego(juego){
  let html = `<form action='/juegos/borrar/${juego._id}' method='post' >`;
  html += `<h2>¿Estás seguro que quieres borrar este juego?</h2>`;
  html += `<p><strong>${juego.nombre}</strong> (${juego.editorial})</p>`;
  html += "<div><input type='submit' value='Confirmar Borrado'/></div>";
  html += "</form>"
  html += `<a href="/juegos">Cancelar</a>`;
  
  return createPage("Borrar Juego", html);
}

/**
 * Mensaje de éxito tras eliminar.
 */
export function borrarExito(){
  let html = ""
  html += "<p>Juego borrado correctamente</p>"
  html += `<a href="/juegos">Volver a la lista</a>`;
  return createPage( "Éxito", html )
}
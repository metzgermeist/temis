// Importar dependencias necesarias.
import './SeccionBlog.css'

// Seccion reservada para el futuro blog juridico del estudio.
function SeccionBlog() {
  // Renderizar el bloque informativo del blog.
  return (
    <section className="seccion-blog animacion-aparecer" id="blog" aria-labelledby="titulo-blog">
      {/* Encabezado de la seccion blog */}
      <header className="seccion-blog__encabezado">
        <p className="seccion-blog__etiqueta">Blog juridico</p>
        <h2 id="titulo-blog">Espacio para compartir novedades legales y analisis.</h2>
        <p className="seccion-blog__descripcion">
          Muy pronto el estudio publicara articulos, guias y actualizaciones legales para clientes y
          empresas.
        </p>
      </header>
      {/* Panel de anuncio de proximos contenidos */}
      <article className="seccion-blog__panel">
        <p className="seccion-blog__panel-titulo">Contenido disponible proximamente</p>
        <p className="seccion-blog__panel-texto">
          El equipo legal podra cargar notas y recursos a traves del panel interno.
        </p>
      </article>
    </section>
  )
}

export default SeccionBlog






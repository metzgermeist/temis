import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SeccionBlog.css'
import { useAuth } from '../contexto/AuthContexto.jsx'
import { blogApi } from '../services/blogApi'

function SeccionBlog() {
  const { esAdmin } = useAuth()
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const cargarBlogs = async () => {
    setError('')
    setCargando(true)
    try {
      const respuesta = await blogApi.listarBlogsPublicos()
      setBlogs(respuesta)
    } catch (e) {
      setError(e.message || 'No fue posible cargar los blogs.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarBlogs()
  }, [])

  const pausarBlog = async (evento, blogId) => {
    evento.preventDefault()
    evento.stopPropagation()
    try {
      await blogApi.pausarBlogAdmin(blogId)
      await cargarBlogs()
    } catch (e) {
      setError(e.message || 'No fue posible pausar el blog.')
    }
  }

  const eliminarBlog = async (evento, blogId) => {
    evento.preventDefault()
    evento.stopPropagation()
    try {
      await blogApi.eliminarBlogAdmin(blogId)
      await cargarBlogs()
    } catch (e) {
      setError(e.message || 'No fue posible eliminar el blog.')
    }
  }

  const editarBlog = (evento, blogId) => {
    evento.preventDefault()
    evento.stopPropagation()
    navigate(`/herramientas-blog?modo=editar&id=${blogId}`)
  }

  return (
    <section className="seccion-blog animacion-aparecer" id="blog" aria-labelledby="titulo-blog">
      <header className="seccion-blog__encabezado">
        <p className="seccion-blog__etiqueta">Blog juridico</p>
        <h2 id="titulo-blog">Novedades y analisis legales del estudio.</h2>
        <p className="seccion-blog__descripcion">
          Cada nota incluye recomendaciones practicas para personas y empresas.
        </p>
      </header>

      {cargando ? <p className="seccion-blog__estado">Cargando blogs...</p> : null}
      {error ? <p className="seccion-blog__estado seccion-blog__estado--error">{error}</p> : null}

      {!cargando && !error && blogs.length === 0 ? (
        <article className="seccion-blog__panel">
          <p className="seccion-blog__panel-titulo">Sin publicaciones activas</p>
          <p className="seccion-blog__panel-texto">
            El estudio publicara nuevos articulos en breve.
          </p>
        </article>
      ) : null}

      {!cargando && blogs.length > 0 ? (
        <ul className="seccion-blog__lista">
          {blogs.map((blog) => (
            <li key={blog.id} className="seccion-blog__item">
              <Link to={`/blog/${blog.slug}`} className="seccion-blog__tarjeta">
                {blog.imagenPortada ? (
                  <img src={blog.imagenPortada} alt={`Portada de ${blog.titulo}`} />
                ) : (
                  <div className="seccion-blog__sin-imagen">Sin portada</div>
                )}
                <h3>{blog.titulo}</h3>
                <p>{blog.extracto}</p>
                <p className="seccion-blog__leer-mas">Leer articulo completo</p>
              </Link>
              {esAdmin ? (
                <div className="seccion-blog__acciones-admin" aria-label="Acciones administrativas del blog">
                  <button type="button" onClick={(evento) => editarBlog(evento, blog.id)} title="Editar blog">
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
                      <path
                        d="m15.2 5.2 3.6 3.6-9.3 9.3H5.9v-3.6l9.3-9.3Zm1.1-1.1 1.5-1.5a1.7 1.7 0 0 1 2.4 0l1.2 1.2a1.7 1.7 0 0 1 0 2.4l-1.5 1.5-3.6-3.6Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Editar</span>
                  </button>
                  <button type="button" onClick={(evento) => pausarBlog(evento, blog.id)} title="Pausar blog">
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
                      <path d="M7 4h4v16H7V4Zm6 0h4v16h-4V4Z" fill="currentColor" />
                    </svg>
                    <span className="sr-only">Pausar</span>
                  </button>
                  <button type="button" onClick={(evento) => eliminarBlog(evento, blog.id)} title="Eliminar blog">
                    <svg aria-hidden="true" viewBox="0 0 24 24" width="16" height="16">
                      <path
                        d="M8 6h8l-.7 13.1c0 .5-.5.9-1 .9H9.7a1 1 0 0 1-1-.9L8 6Zm2-3h4l1 1.5H19V6H5V4.5h4L10 3Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Eliminar</span>
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default SeccionBlog


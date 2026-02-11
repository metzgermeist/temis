import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './BlogDetalle.css'
import { blogApi } from '../services/blogApi'
import PieDePagina from '../molecules/PieDePagina.jsx'
import BotonWhatsAppFlotante from '../atoms/BotonWhatsAppFlotante.jsx'

const escaparHtml = (texto) => {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function BlogDetalle() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mensajeCompartir, setMensajeCompartir] = useState('')

  useEffect(() => {
    let activo = true

    async function cargar() {
      setCargando(true)
      setError('')
      try {
        const respuesta = await blogApi.obtenerBlogPublicoPorSlug(slug)
        if (!activo) return
        if (!respuesta) {
          setError('El blog solicitado no esta disponible.')
          setBlog(null)
          return
        }
        setBlog(respuesta)
      } catch (e) {
        if (!activo) return
        setError(e.message || 'No se pudo cargar el blog.')
        setBlog(null)
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargar()
    return () => {
      activo = false
    }
  }, [slug])

  const urlActual = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }, [])

  const contenidoHtml = useMemo(() => {
    const contenido = blog?.contenido || ''
    if (!contenido.trim()) return ''

    const pareceHtml = /<\/?[a-z][\s\S]*>/i.test(contenido)
    if (pareceHtml) return contenido

    return contenido
      .split('\n\n')
      .map((parrafo) => `<p>${escaparHtml(parrafo)}</p>`)
      .join('')
  }, [blog?.contenido])

  const imagenesDetalle = useMemo(() => {
    return (blog?.imagenes || []).filter(Boolean).slice(0, 2)
  }, [blog?.imagenes])

  const compartirWhatsApp = () => {
    const texto = `${blog.titulo} - ${urlActual}`
    const enlace = `https://wa.me/?text=${encodeURIComponent(texto)}`
    window.open(enlace, '_blank', 'noopener,noreferrer')
    setMensajeCompartir('Abriendo WhatsApp para compartir la nota.')
  }

  const compartirInstagram = async () => {
    if (navigator?.share) {
      try {
        await navigator.share({
          title: blog.titulo,
          text: blog.extracto || blog.titulo,
          url: urlActual
        })
        setMensajeCompartir('Compartido desde el panel del dispositivo.')
        return
      } catch (errorShare) {
        if (errorShare?.name === 'AbortError') return
      }
    }

    let copiado = false
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(urlActual)
        copiado = true
      }
    } catch (_error) {
      // Si falla el clipboard, igual se abre Instagram para continuar manual.
    }
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
    setMensajeCompartir(
      copiado
        ? 'Enlace copiado. Pegalo en una historia o mensaje de Instagram.'
        : 'Instagram abierto. Si no se copio automaticamente, copia la URL del navegador.'
    )
  }

  if (cargando) {
    return (
      <main className="blog-detalle">
        <div className="blog-detalle__cuerpo">
          <p className="blog-detalle__estado">Cargando blog...</p>
        </div>
        <PieDePagina />
        <BotonWhatsAppFlotante numero="+54 9 3815 90-4189" instagramUsuario="@carloscanevaro" />
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main className="blog-detalle">
        <div className="blog-detalle__cuerpo">
          <article className="blog-detalle__error">
            <h1>Blog no disponible</h1>
            <p>{error || 'No se encontro el contenido solicitado.'}</p>
            <Link to="/" className="blog-detalle__volver">
              Volver al inicio
            </Link>
          </article>
        </div>
        <PieDePagina />
        <BotonWhatsAppFlotante numero="+54 9 3815 90-4189" instagramUsuario="@carloscanevaro" />
      </main>
    )
  }

  return (
    <main className="blog-detalle">
      <div className="blog-detalle__cuerpo">
        <section className="blog-detalle__encabezado">
          <Link to="/" className="blog-detalle__volver">
            Volver al inicio
          </Link>
          <p className="blog-detalle__etiqueta">Blog juridico</p>
          <h1>{blog.titulo}</h1>
          {blog.subtitulo ? <h2>{blog.subtitulo}</h2> : null}
          {blog.epigrafe ? <p className="blog-detalle__epigrafe">{blog.epigrafe}</p> : null}
          {blog.imagenPortada ? (
            <img src={blog.imagenPortada} alt={`Portada de ${blog.titulo}`} className="blog-detalle__portada" />
          ) : null}
        </section>

        <article
          className="blog-detalle__contenido"
          dangerouslySetInnerHTML={{ __html: contenidoHtml }}
        />

        {imagenesDetalle.length ? (
          <section className="blog-detalle__galeria" aria-label="Galeria de imagenes del blog">
            {imagenesDetalle.map((imagen, indice) => (
              <img key={`${blog.id}-imagen-${indice}`} src={imagen} alt={`Imagen ${indice + 1} de ${blog.titulo}`} />
            ))}
          </section>
        ) : null}

        <section className="blog-detalle__compartir" aria-label="Compartir blog">
          <p className="blog-detalle__compartir-titulo">Compartir en:</p>
          <div className="blog-detalle__compartir-botones">
            <button
              type="button"
              className="blog-detalle__compartir-btn blog-detalle__compartir-btn--whatsapp"
              onClick={compartirWhatsApp}
              title="Compartir por WhatsApp"
              aria-label="Compartir esta nota por WhatsApp"
            >
              <svg aria-hidden="true" viewBox="0 0 32 32" height="20" width="20">
                <path
                  fill="currentColor"
                  d="M16.01 4C9.39 4 4 9.39 4 16c0 2.34.67 4.62 1.94 6.6L4 28l5.55-1.84A12.01 12.01 0 0 0 28 16C28 9.39 22.63 4 16.01 4zm6.96 16.3c-.3.84-1.74 1.64-2.44 1.72-.6.08-1.36.12-2.2-.14-.5-.16-1.16-.38-1.98-.74-3.48-1.52-5.74-5.2-5.92-5.44-.16-.24-1.4-1.86-1.4-3.54 0-1.68.88-2.5 1.2-2.84.3-.34.7-.42.94-.42h.68c.22 0 .52-.02.8.6.3.68 1.02 2.34 1.1 2.52.08.18.14.4.02.64-.12.24-.18.4-.36.62-.18.22-.38.5-.54.66-.18.18-.36.38-.16.74.2.36.9 1.5 1.94 2.44 1.34 1.18 2.48 1.54 2.84 1.72.36.18.56.16.78-.1.22-.26.9-1.04 1.14-1.4.24-.36.48-.3.8-.18.32.12 2.04.96 2.4 1.14.36.18.6.26.68.4.08.14.08.84-.22 1.68z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="blog-detalle__compartir-btn blog-detalle__compartir-btn--instagram"
              onClick={compartirInstagram}
              title="Compartir por Instagram"
              aria-label="Compartir esta nota por Instagram"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" height="20" width="20">
                <path
                  fill="currentColor"
                  d="M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm0 8.6a5.4 5.4 0 1 1 0-10.8 5.4 5.4 0 0 1 0 10.8Zm6.7-11.2a1.26 1.26 0 1 1 0-2.52 1.26 1.26 0 0 1 0 2.52ZM17 3.5H7A3.5 3.5 0 0 0 3.5 7v10A3.5 3.5 0 0 0 7 20.5h10A3.5 3.5 0 0 0 20.5 17V7A3.5 3.5 0 0 0 17 3.5Zm2 13.5A2 2 0 0 1 17 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10Z"
                />
              </svg>
            </button>
          </div>
          {mensajeCompartir ? <p className="blog-detalle__compartir-nota">{mensajeCompartir}</p> : null}
        </section>
      </div>
      <PieDePagina />
      <BotonWhatsAppFlotante numero="+54 9 3815 90-4189" instagramUsuario="@carloscanevaro" />
    </main>
  )
}

export default BlogDetalle

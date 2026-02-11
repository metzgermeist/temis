import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './HerramientasBlog.css'
import { useAuth } from '../contexto/AuthContexto'
import { blogApi } from '../services/blogApi'
import { cloudinaryConfigurado, subirImagenACloudinary } from '../services/cloudinary/uploadImage'
import EditorTextoRico from '../molecules/EditorTextoRico.jsx'

const OPCIONES_MENU = [
  { id: 'crear', texto: 'Crear nuevo blog' },
  { id: 'editar', texto: 'Editar blog' },
  { id: 'pausar', texto: 'Pausar blog' },
  { id: 'eliminar', texto: 'Eliminar blog' }
]

const ESTADO_LABEL = {
  published: 'Publicado',
  paused: 'Pausado',
  deleted: 'Eliminado'
}
const LIMITE_IMAGENES_CONTENIDO = 2

const formularioVacio = () => ({
  titulo: '',
  slug: '',
  extracto: '',
  subtitulo: '',
  epigrafe: '',
  contenido: '',
  imagenPortada: '',
  imagenesTexto: '',
  estado: 'published'
})

const blogAFormulario = (blog) => ({
  titulo: blog?.titulo || '',
  slug: blog?.slug || '',
  extracto: blog?.extracto || '',
  subtitulo: blog?.subtitulo || '',
  epigrafe: blog?.epigrafe || '',
  contenido: blog?.contenido || '',
  imagenPortada: blog?.imagenPortada || '',
  imagenesTexto: (blog?.imagenes || []).join('\n'),
  estado: blog?.estado || 'published'
})

const formularioARequest = (formulario) => ({
  titulo: formulario.titulo,
  slug: formulario.slug,
  extracto: formulario.extracto,
  subtitulo: formulario.subtitulo,
  epigrafe: formulario.epigrafe,
  contenido: formulario.contenido,
  imagenPortada: formulario.imagenPortada,
  imagenes: formulario.imagenesTexto
    .split('\n')
    .map((url) => url.trim())
    .filter(Boolean)
    .slice(0, LIMITE_IMAGENES_CONTENIDO),
  estado: formulario.estado
})

const listaUrlsDesdeTexto = (texto) => {
  return (texto || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

const agregarUrlAListaTexto = (textoActual, urlNueva) => {
  const listaActual = listaUrlsDesdeTexto(textoActual)
  if (!listaActual.includes(urlNueva)) {
    listaActual.push(urlNueva)
  }
  return listaActual.join('\n')
}

const quitarUrlDeListaTexto = (textoActual, indiceAEliminar) => {
  const listaActual = listaUrlsDesdeTexto(textoActual)
  return listaActual.filter((_item, indice) => indice !== indiceAEliminar).join('\n')
}

function HerramientasBlog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { sesion, cerrarSesion } = useAuth()
  const [modoApi, setModoApi] = useState('...')
  const [modoActivo, setModoActivo] = useState('crear')
  const [blogs, setBlogs] = useState([])
  const [blogEditarId, setBlogEditarId] = useState('')
  const [formCrear, setFormCrear] = useState(formularioVacio())
  const [formEditar, setFormEditar] = useState(formularioVacio())
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const blogsNoEliminados = useMemo(() => {
    return blogs.filter((blog) => blog.estado !== 'deleted')
  }, [blogs])

  const blogSeleccionado = useMemo(() => {
    return blogs.find((blog) => blog.id === blogEditarId) || null
  }, [blogs, blogEditarId])

  useEffect(() => {
    const modo = searchParams.get('modo')
    const id = searchParams.get('id')
    if (modo && OPCIONES_MENU.some((opcion) => opcion.id === modo)) {
      setModoActivo(modo)
    }
    if (id) {
      setBlogEditarId(id)
    }
  }, [searchParams])

  useEffect(() => {
    let activo = true

    async function iniciar() {
      try {
        const infoModo = await blogApi.obtenerModo()
        if (activo) setModoApi(infoModo?.modo || 'desconocido')
      } catch (_error) {
        if (activo) setModoApi('desconocido')
      }
      await cargarBlogs(activo)
    }

    iniciar()
    return () => {
      activo = false
    }
  }, [])

  useEffect(() => {
    if (!blogSeleccionado) return
    setFormEditar(blogAFormulario(blogSeleccionado))
  }, [blogSeleccionado])

  const cargarBlogs = async (activo = true) => {
    setCargando(true)
    setError('')

    try {
      const respuesta = await blogApi.listarBlogsAdmin()
      if (!activo) return
      setBlogs(respuesta)

      if (!blogEditarId && respuesta.length) {
        const primerEditable = respuesta.find((blog) => blog.estado !== 'deleted')
        if (primerEditable) setBlogEditarId(primerEditable.id)
      }
    } catch (e) {
      if (!activo) return
      setError(e.message || 'No se pudieron cargar los blogs.')
    } finally {
      if (activo) setCargando(false)
    }
  }

  const cambiarModo = (modo) => {
    setModoActivo(modo)
    setMensaje('')
    setError('')
    const nuevo = new URLSearchParams(searchParams)
    nuevo.set('modo', modo)
    if (modo !== 'editar') {
      nuevo.delete('id')
    }
    setSearchParams(nuevo)
  }

  const manejarCrear = async (evento) => {
    evento.preventDefault()
    setMensaje('')
    setError('')
    try {
      await blogApi.crearBlogAdmin(formularioARequest(formCrear))
      setMensaje('Blog creado correctamente.')
      setFormCrear(formularioVacio())
      await cargarBlogs()
    } catch (e) {
      setError(e.message || 'No se pudo crear el blog.')
    }
  }

  const manejarEditar = async (evento) => {
    evento.preventDefault()
    if (!blogEditarId) {
      setError('Selecciona un blog para editar.')
      return
    }
    setMensaje('')
    setError('')
    try {
      await blogApi.editarBlogAdmin(blogEditarId, formularioARequest(formEditar))
      setMensaje('Blog actualizado correctamente.')
      await cargarBlogs()
    } catch (e) {
      setError(e.message || 'No se pudo editar el blog.')
    }
  }

  const alternarPausa = async (blog) => {
    setMensaje('')
    setError('')
    try {
      await blogApi.pausarBlogAdmin(blog.id)
      setMensaje(
        blog.estado === 'paused'
          ? 'Blog reactivado y visible para el publico.'
          : 'Blog pausado y oculto del listado publico.'
      )
      await cargarBlogs()
    } catch (e) {
      setError(e.message || 'No se pudo pausar/reactivar el blog.')
    }
  }

  const eliminarBlog = async (blog) => {
    setMensaje('')
    setError('')
    try {
      await blogApi.eliminarBlogAdmin(blog.id)
      setMensaje('Blog eliminado logicamente.')
      await cargarBlogs()
    } catch (e) {
      setError(e.message || 'No se pudo eliminar el blog.')
    }
  }

  const irAEditar = (id) => {
    setBlogEditarId(id)
    setModoActivo('editar')
    setSearchParams({ modo: 'editar', id })
  }

  if (cargando) {
    return (
      <main className="herramientas-blog">
        <p className="herramientas-blog__estado">Cargando panel de herramientas...</p>
      </main>
    )
  }

  return (
    <main className="herramientas-blog">
      <header className="herramientas-blog__encabezado">
        <div>
          <p className="herramientas-blog__etiqueta">Panel privado</p>
          <h1>Herramientas blog</h1>
          <p>
            Sesion activa: <strong>{sesion?.usuario?.nombre || 'Admin'}</strong>
          </p>
          <p>
            Fuente de datos actual: <strong>{modoApi}</strong>
          </p>
        </div>
        <div className="herramientas-blog__acciones-top">
          <Link to="/" className="herramientas-blog__top-btn">
            Ver sitio publico
          </Link>
          <button type="button" className="herramientas-blog__top-btn" onClick={cerrarSesion}>
            Cerrar sesion
          </button>
        </div>
      </header>

      <nav className="herramientas-blog__menu" aria-label="Menu de herramientas del blog">
        {OPCIONES_MENU.map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            className={`herramientas-blog__menu-btn${
              modoActivo === opcion.id ? ' herramientas-blog__menu-btn--activo' : ''
            }`}
            onClick={() => cambiarModo(opcion.id)}
          >
            {opcion.texto}
          </button>
        ))}
      </nav>

      {error ? <p className="herramientas-blog__error">{error}</p> : null}
      {mensaje ? <p className="herramientas-blog__ok">{mensaje}</p> : null}

      {modoActivo === 'crear' ? (
        <section className="herramientas-blog__seccion">
          <h2>Crear nuevo blog</h2>
          <FormularioBlog
            formulario={formCrear}
            onChange={setFormCrear}
            onSubmit={manejarCrear}
            textoBoton="Guardar y publicar"
          />
        </section>
      ) : null}

      {modoActivo === 'editar' ? (
        <section className="herramientas-blog__seccion">
          <h2>Editar blog</h2>
          <label htmlFor="selector-editar-blog" className="herramientas-blog__selector-label">
            Seleccionar blog
          </label>
          <select
            id="selector-editar-blog"
            className="herramientas-blog__selector"
            value={blogEditarId}
            onChange={(evento) => {
              setBlogEditarId(evento.target.value)
              setSearchParams({ modo: 'editar', id: evento.target.value })
            }}
          >
            {blogsNoEliminados.map((blog) => (
              <option key={blog.id} value={blog.id}>
                {blog.titulo} - {ESTADO_LABEL[blog.estado]}
              </option>
            ))}
          </select>
          {blogSeleccionado ? (
            <FormularioBlog
              formulario={formEditar}
              onChange={setFormEditar}
              onSubmit={manejarEditar}
              textoBoton="Guardar cambios"
            />
          ) : null}
        </section>
      ) : null}

      {modoActivo === 'pausar' ? (
        <section className="herramientas-blog__seccion">
          <h2>Pausar o reactivar blogs</h2>
          <ul className="herramientas-blog__lista">
            {blogsNoEliminados.map((blog) => (
              <li
                key={blog.id}
                className={`herramientas-blog__item${
                  blog.estado === 'paused' ? ' herramientas-blog__item--pausado' : ''
                }`}
              >
                <article>
                  <h3>{blog.titulo}</h3>
                  <p>{blog.extracto}</p>
                  <p className="herramientas-blog__estado-badge">{ESTADO_LABEL[blog.estado]}</p>
                  <div className="herramientas-blog__item-acciones">
                    <button type="button" onClick={() => alternarPausa(blog)}>
                      {blog.estado === 'paused' ? 'Reactivar' : 'Pausar'}
                    </button>
                    <button type="button" onClick={() => irAEditar(blog.id)}>
                      Editar
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {modoActivo === 'eliminar' ? (
        <section className="herramientas-blog__seccion">
          <h2>Eliminacion logica</h2>
          <ul className="herramientas-blog__lista">
            {blogs.map((blog) => (
              <li key={blog.id} className="herramientas-blog__item">
                <article>
                  <h3>{blog.titulo}</h3>
                  <p className="herramientas-blog__estado-badge">{ESTADO_LABEL[blog.estado]}</p>
                  <div className="herramientas-blog__item-acciones">
                    {blog.estado === 'deleted' ? (
                      <span className="herramientas-blog__eliminado">Ya eliminado logicamente</span>
                    ) : (
                      <button type="button" onClick={() => eliminarBlog(blog)}>
                        Eliminar
                      </button>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  )
}

function FormularioBlog({ formulario, onChange, onSubmit, textoBoton }) {
  const inputPortadaRef = useRef(null)
  const inputContenidoRef = useRef(null)
  const [subiendoPortada, setSubiendoPortada] = useState(false)
  const [subiendoContenido, setSubiendoContenido] = useState(false)
  const [arrastrandoPortada, setArrastrandoPortada] = useState(false)
  const [arrastrandoContenido, setArrastrandoContenido] = useState(false)
  const [mensajeCarga, setMensajeCarga] = useState('')
  const [errorCarga, setErrorCarga] = useState('')
  const cloudinaryActivo = cloudinaryConfigurado()

  const urlsGaleria = useMemo(() => {
    return listaUrlsDesdeTexto(formulario.imagenesTexto).slice(0, LIMITE_IMAGENES_CONTENIDO)
  }, [formulario.imagenesTexto])

  const actualizarCampo = (campo, valor) => {
    onChange((previo) => ({ ...previo, [campo]: valor }))
  }

  const limpiarMensajesCarga = () => {
    setErrorCarga('')
    setMensajeCarga('')
  }

  const archivoADataUrl = (archivo) => {
    return new Promise((resolve, reject) => {
      const lector = new FileReader()
      lector.onload = () => resolve(lector.result)
      lector.onerror = () => reject(new Error('No se pudo leer la imagen seleccionada.'))
      lector.readAsDataURL(archivo)
    })
  }

  const subirImagen = async (archivo) => {
    if (!archivo || !archivo.type?.startsWith('image/')) {
      throw new Error('Selecciona un archivo de imagen valido.')
    }

    if (cloudinaryActivo) {
      return subirImagenACloudinary(archivo)
    }

    return archivoADataUrl(archivo)
  }

  const manejarQuitarImagenGaleria = (indice) => {
    actualizarCampo('imagenesTexto', quitarUrlDeListaTexto(formulario.imagenesTexto, indice))
  }

  const subirArchivoPortada = async (archivo) => {
    limpiarMensajesCarga()
    if (!archivo) return

    setSubiendoPortada(true)
    try {
      const url = await subirImagen(archivo)
      actualizarCampo('imagenPortada', url)
      setMensajeCarga(
        cloudinaryActivo
          ? 'Portada subida correctamente a Cloudinary.'
          : 'Portada cargada en modo demo local.'
      )
    } catch (e) {
      setErrorCarga(e.message || 'No se pudo subir la portada.')
    } finally {
      setSubiendoPortada(false)
    }
  }

  const subirImagenesContenido = async (archivos) => {
    limpiarMensajesCarga()
    const imagenes = Array.from(archivos || []).filter((archivo) => {
      return archivo?.type?.startsWith('image/')
    })

    if (!imagenes.length) {
      setErrorCarga('No se detectaron imagenes validas para la galeria.')
      return
    }

    const actuales = listaUrlsDesdeTexto(formulario.imagenesTexto)
    const capacidadRestante = LIMITE_IMAGENES_CONTENIDO - actuales.length

    if (capacidadRestante <= 0) {
      setErrorCarga(`Solo se permiten ${LIMITE_IMAGENES_CONTENIDO} imagenes en la noticia extendida.`)
      return
    }

    const imagenesParaSubir = imagenes.slice(0, capacidadRestante)

    setSubiendoContenido(true)
    try {
      const urlsSubidas = []
      for (const archivo of imagenesParaSubir) {
        const url = await subirImagen(archivo)
        urlsSubidas.push(url)
      }

      const siguienteTexto = urlsSubidas.reduce((acumulado, url) => {
        return agregarUrlAListaTexto(acumulado, url)
      }, formulario.imagenesTexto)

      actualizarCampo('imagenesTexto', siguienteTexto)
      const mensajeBase = cloudinaryActivo
        ? urlsSubidas.length === 1
          ? 'Imagen agregada al contenido.'
          : `${urlsSubidas.length} imagenes agregadas al contenido.`
        : urlsSubidas.length === 1
          ? 'Imagen cargada en modo demo local.'
          : `${urlsSubidas.length} imagenes cargadas en modo demo local.`

      const seRecortaron = imagenes.length > imagenesParaSubir.length
      setMensajeCarga(
        seRecortaron
          ? `${mensajeBase} Se aplico limite de ${LIMITE_IMAGENES_CONTENIDO} imagenes.`
          : mensajeBase
      )
    } catch (e) {
      setErrorCarga(e.message || 'No se pudieron subir imagenes del contenido.')
    } finally {
      setSubiendoContenido(false)
    }
  }

  const manejarPortadaDesdeInput = (evento) => {
    const archivo = evento.target.files?.[0]
    if (archivo) {
      subirArchivoPortada(archivo)
    }
    evento.target.value = ''
  }

  const manejarContenidoDesdeInput = (evento) => {
    const archivos = evento.target.files || []
    if (archivos.length) {
      subirImagenesContenido(archivos)
    }
    evento.target.value = ''
  }

  const manejarDropPortada = (evento) => {
    evento.preventDefault()
    evento.stopPropagation()
    setArrastrandoPortada(false)
    const archivos = evento.dataTransfer?.files || []
    if (archivos.length) {
      subirArchivoPortada(archivos[0])
      return
    }
    setErrorCarga('Arrastra un archivo de imagen para la portada.')
  }

  const manejarDropContenido = (evento) => {
    evento.preventDefault()
    evento.stopPropagation()
    setArrastrandoContenido(false)
    const archivos = evento.dataTransfer?.files || []
    if (archivos.length) {
      subirImagenesContenido(archivos)
      return
    }
    setErrorCarga('Arrastra una o varias imagenes para el contenido.')
  }

  const manejarPastePortada = (evento) => {
    const items = Array.from(evento.clipboardData?.items || [])
    const itemImagen = items.find((item) => item.kind === 'file' && item.type.startsWith('image/'))
    if (!itemImagen) return
    evento.preventDefault()
    const archivo = itemImagen.getAsFile()
    if (archivo) subirArchivoPortada(archivo)
  }

  const manejarPasteContenido = (evento) => {
    const items = Array.from(evento.clipboardData?.items || [])
    const archivos = items
      .filter((item) => item.kind === 'file' && item.type.startsWith('image/'))
      .map((item) => item.getAsFile())
      .filter(Boolean)
    if (!archivos.length) return
    evento.preventDefault()
    subirImagenesContenido(archivos)
  }

  return (
    <form className="herramientas-blog__formulario" onSubmit={onSubmit}>
      <label htmlFor="titulo-blog">Titulo</label>
      <input
        id="titulo-blog"
        type="text"
        value={formulario.titulo}
        onChange={(evento) => actualizarCampo('titulo', evento.target.value)}
        required
      />

      <label htmlFor="slug-blog">
        Slug (opcional)
        <span className="herramientas-blog__ayuda-label">
          Texto para la URL del blog (ej: /blog/mi-noticia).
        </span>
      </label>
      <input
        id="slug-blog"
        type="text"
        value={formulario.slug}
        onChange={(evento) => actualizarCampo('slug', evento.target.value)}
        placeholder="si lo dejas vacio se genera automatico"
      />
      <details className="herramientas-blog__tip-seo">
        <summary>Tip SEO del slug</summary>
        <p>
          Conviene que sea corto, descriptivo y con guiones (ej: derecho-laboral-2026). Evita
          caracteres especiales y no lo cambies despues de publicar. Mejora el trafico y las
          visitas a la pagina.
        </p>
      </details>

      <label htmlFor="extracto-blog">
        Extracto
        <span className="herramientas-blog__ayuda-label">
          Resumen corto que se ve en el indice antes de abrir la nota.
        </span>
      </label>
      <textarea
        id="extracto-blog"
        rows="2"
        value={formulario.extracto}
        onChange={(evento) => actualizarCampo('extracto', evento.target.value)}
        required
      />

      <label htmlFor="subtitulo-blog">Subtitulo</label>
      <input
        id="subtitulo-blog"
        type="text"
        value={formulario.subtitulo}
        onChange={(evento) => actualizarCampo('subtitulo', evento.target.value)}
      />

      <label htmlFor="epigrafe-blog">Epigrafe</label>
      <input
        id="epigrafe-blog"
        type="text"
        value={formulario.epigrafe}
        onChange={(evento) => actualizarCampo('epigrafe', evento.target.value)}
      />

      <section className="herramientas-blog__subidor">
        <p className="herramientas-blog__bloque-titulo">Imagen de portada (se muestra en el indice)</p>
        <div
          className={`herramientas-blog__zona-arrastre${
            arrastrandoPortada ? ' herramientas-blog__zona-arrastre--activa' : ''
          }`}
          onDragOver={(evento) => {
            evento.preventDefault()
            evento.stopPropagation()
          }}
          onDragEnter={(evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            setArrastrandoPortada(true)
          }}
          onDragLeave={(evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            setArrastrandoPortada(false)
          }}
          onDrop={manejarDropPortada}
          onPaste={manejarPastePortada}
          tabIndex={0}
        >
          {arrastrandoPortada ? 'sueltala' : 'Arrastra o pega tu imagen aqui'}
        </div>
        <div className="herramientas-blog__subida-acciones">
          <button
            type="button"
            className="herramientas-blog__secundario herramientas-blog__subir-btn"
            onClick={() => inputPortadaRef.current?.click()}
            disabled={subiendoPortada}
          >
            {subiendoPortada ? 'Subiendo portada...' : 'o subir foto de portada'}
          </button>
          <input
            ref={inputPortadaRef}
            type="file"
            accept="image/*"
            className="herramientas-blog__input-archivo"
            onChange={manejarPortadaDesdeInput}
          />
        </div>
        {formulario.imagenPortada ? (
          <figure className="herramientas-blog__preview">
            <img src={formulario.imagenPortada} alt="Vista previa de portada" />
          </figure>
        ) : null}
        {formulario.imagenPortada ? (
          <button
            type="button"
            className="herramientas-blog__quitar-portada-btn"
            onClick={() => actualizarCampo('imagenPortada', '')}
          >
            Quitar foto de portada
          </button>
        ) : null}
      </section>

      <section className="herramientas-blog__subidor">
        <p className="herramientas-blog__bloque-titulo">
          Imagenes de la noticia extendida (detalle completo)
        </p>
        <div
          className={`herramientas-blog__zona-arrastre${
            arrastrandoContenido ? ' herramientas-blog__zona-arrastre--activa' : ''
          }`}
          onDragOver={(evento) => {
            evento.preventDefault()
            evento.stopPropagation()
          }}
          onDragEnter={(evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            setArrastrandoContenido(true)
          }}
          onDragLeave={(evento) => {
            evento.preventDefault()
            evento.stopPropagation()
            setArrastrandoContenido(false)
          }}
          onDrop={manejarDropContenido}
          onPaste={manejarPasteContenido}
          tabIndex={0}
        >
          {arrastrandoContenido ? 'sueltala' : 'Arrastra o pega tus imagenes aqui'}
        </div>
        <div className="herramientas-blog__subida-acciones">
          <button
            type="button"
            className="herramientas-blog__secundario herramientas-blog__subir-btn"
            onClick={() => inputContenidoRef.current?.click()}
            disabled={subiendoContenido}
          >
            {subiendoContenido ? 'Subiendo imagenes...' : 'o subir imagenes del contenido'}
          </button>
          <input
            ref={inputContenidoRef}
            type="file"
            accept="image/*"
            multiple
            className="herramientas-blog__input-archivo"
            onChange={manejarContenidoDesdeInput}
          />
        </div>

        {urlsGaleria.length ? (
          <ul className="herramientas-blog__galeria-preview">
            {urlsGaleria.map((url, indice) => (
              <li key={`${url}-${indice}`} className="herramientas-blog__galeria-item">
                <img src={url} alt={`Vista previa galeria ${indice + 1}`} />
                <button
                  type="button"
                  className="herramientas-blog__quitar-imagen"
                  aria-label={`Quitar imagen ${indice + 1} de la galeria`}
                  title="Quitar imagen"
                  onClick={() => manejarQuitarImagenGaleria(indice)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="herramientas-blog__nota">Aun no hay imagenes cargadas en la galeria.</p>
        )}
        <p className="herramientas-blog__nota">
          Limite actual: {LIMITE_IMAGENES_CONTENIDO} imagenes para la noticia extendida.
        </p>
      </section>

      {!cloudinaryActivo ? (
        <p className="herramientas-blog__aviso">
          Cloudinary no esta configurado. Las imagenes se guardaran en modo demo local.
        </p>
      ) : null}

      {errorCarga ? <p className="herramientas-blog__error">{errorCarga}</p> : null}
      {mensajeCarga ? <p className="herramientas-blog__ok">{mensajeCarga}</p> : null}

      <label htmlFor="estado-blog">Estado</label>
      <select
        id="estado-blog"
        value={formulario.estado}
        onChange={(evento) => actualizarCampo('estado', evento.target.value)}
      >
        <option value="published">Publicado</option>
        <option value="paused">Pausado</option>
      </select>

      <label htmlFor="contenido-blog">Contenido completo</label>
      <EditorTextoRico
        valor={formulario.contenido}
        onChange={(valorHtml) => actualizarCampo('contenido', valorHtml)}
      />

      <button type="submit">{textoBoton}</button>
    </form>
  )
}

export default HerramientasBlog

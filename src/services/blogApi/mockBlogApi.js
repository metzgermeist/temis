const CREDENCIALES_ADMIN = {
  usuario: import.meta.env.VITE_ADMIN_USER || 'canevaro',
  clave: import.meta.env.VITE_ADMIN_PASSWORD || 'ubi ius'
}

const PERFIL_ADMIN = {
  id: 'admin-canevaro',
  nombre: 'Dr. Carlos Canevaro',
  usuario: CREDENCIALES_ADMIN.usuario
}

const ESTADO = {
  PUBLICADO: 'published',
  PAUSADO: 'paused',
  ELIMINADO: 'deleted'
}

const ahoraIso = () => new Date().toISOString()

const normalizarSlug = (texto) => {
  return texto
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

let sesionActiva = null

let blogs = [
  {
    id: 'blog-1',
    slug: 'como-evitar-conflictos-laborales-en-pymes',
    titulo: 'Como evitar conflictos laborales en pymes',
    extracto:
      'Claves practicas para prevenir contingencias y ordenar la relacion laboral desde el inicio.',
    subtitulo: 'Prevencion legal para empresas en crecimiento',
    epigrafe: 'Guia breve para empleadores en etapa de expansion.',
    contenido:
      'La prevencion reduce litigios y costos innecesarios.\n\nEl primer paso es documentar correctamente la relacion laboral con contratos claros y politicas internas consistentes.\n\nTambien es clave registrar comunicaciones y actualizar protocolos ante cambios normativos.',
    imagenPortada:
      'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    imagenes: [
      'https://res.cloudinary.com/demo/image/upload/w_900/sample.jpg',
      'https://res.cloudinary.com/demo/image/upload/w_900/coffee.jpg'
    ],
    estado: ESTADO.PUBLICADO,
    creadoEn: '2026-02-08T14:00:00.000Z',
    actualizadoEn: '2026-02-08T14:00:00.000Z',
    publicadoEn: '2026-02-08T14:00:00.000Z',
    eliminadoEn: null
  },
  {
    id: 'blog-2',
    slug: 'amparos-de-salud-cuando-y-como-iniciarlos',
    titulo: 'Amparos de salud: cuando y como iniciarlos',
    extracto:
      'Situaciones frecuentes y pasos basicos para actuar rapido ante una cobertura denegada.',
    subtitulo: 'Proteccion judicial de derechos esenciales',
    epigrafe: 'Marco inicial para casos urgentes de prestacion medica.',
    contenido:
      'El amparo es una herramienta constitucional de tutela urgente.\n\nCuando existe riesgo actual para la salud, la rapidez en la estrategia procesal es determinante.\n\nLa evidencia documental y medica inicial suele definir la solidez del reclamo.',
    imagenPortada:
      'https://res.cloudinary.com/demo/image/upload/samples/people/bicycle.jpg',
    imagenes: [
      'https://res.cloudinary.com/demo/image/upload/w_900/samples/people/bicycle.jpg'
    ],
    estado: ESTADO.PAUSADO,
    creadoEn: '2026-02-09T09:00:00.000Z',
    actualizadoEn: '2026-02-09T09:00:00.000Z',
    publicadoEn: '2026-02-09T09:00:00.000Z',
    eliminadoEn: null
  }
]

const clonar = (valor) => JSON.parse(JSON.stringify(valor))

const dormir = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms))

const validarSesion = () => {
  if (!sesionActiva) {
    throw new Error('No autorizado')
  }
}

const ordenarPorFecha = (coleccion) => {
  return coleccion.sort((a, b) => {
    const fechaA = Date.parse(a.publicadoEn || a.actualizadoEn || a.creadoEn)
    const fechaB = Date.parse(b.publicadoEn || b.actualizadoEn || b.creadoEn)
    return fechaB - fechaA
  })
}

const limpiarUrls = (urls) => {
  return (urls || []).map((url) => url.trim()).filter(Boolean)
}

const slugUnico = (slug, idActual = null) => {
  let base = normalizarSlug(slug)
  if (!base) base = 'blog'

  let candidato = base
  let indice = 2
  while (blogs.some((blog) => blog.slug === candidato && blog.id !== idActual)) {
    candidato = `${base}-${indice}`
    indice += 1
  }
  return candidato
}

export const mockBlogApi = {
  async obtenerModo() {
    await dormir()
    return { modo: 'mock' }
  },

  async obtenerSesionAdmin() {
    await dormir()
    return clonar(sesionActiva)
  },

  async loginAdmin(payload) {
    await dormir()
    const usuario = (payload?.usuario || '').trim()
    const clave = payload?.clave || ''

    if (usuario !== CREDENCIALES_ADMIN.usuario || clave !== CREDENCIALES_ADMIN.clave) {
      throw new Error('Credenciales invalidas')
    }

    sesionActiva = {
      token: `mock-token-${Date.now()}`,
      usuario: PERFIL_ADMIN,
      inicioSesionEn: ahoraIso()
    }

    return clonar(sesionActiva)
  },

  async logoutAdmin() {
    await dormir()
    sesionActiva = null
    return { ok: true }
  },

  async listarBlogsPublicos() {
    await dormir()
    const coleccion = blogs.filter((blog) => blog.estado === ESTADO.PUBLICADO)
    return clonar(ordenarPorFecha(coleccion))
  },

  async obtenerBlogPublicoPorSlug(slug) {
    await dormir()
    const blog = blogs.find((item) => item.slug === slug && item.estado === ESTADO.PUBLICADO)
    return clonar(blog || null)
  },

  async listarBlogsAdmin() {
    await dormir()
    validarSesion()
    return clonar(ordenarPorFecha([...blogs]))
  },

  async crearBlogAdmin(payload) {
    await dormir()
    validarSesion()

    const creadoEn = ahoraIso()
    const estado = payload?.estado === ESTADO.PAUSADO ? ESTADO.PAUSADO : ESTADO.PUBLICADO
    const slug = slugUnico(payload?.slug || payload?.titulo || '')

    const nuevo = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `blog-${Date.now()}`,
      slug,
      titulo: (payload?.titulo || '').trim(),
      extracto: (payload?.extracto || '').trim(),
      subtitulo: (payload?.subtitulo || '').trim(),
      epigrafe: (payload?.epigrafe || '').trim(),
      contenido: (payload?.contenido || '').trim(),
      imagenPortada: (payload?.imagenPortada || '').trim(),
      imagenes: limpiarUrls(payload?.imagenes),
      estado,
      creadoEn,
      actualizadoEn: creadoEn,
      publicadoEn: estado === ESTADO.PUBLICADO ? creadoEn : null,
      eliminadoEn: null
    }

    blogs = [nuevo, ...blogs]
    return clonar(nuevo)
  },

  async editarBlogAdmin(id, payload) {
    await dormir()
    validarSesion()
    const indice = blogs.findIndex((blog) => blog.id === id)
    if (indice < 0) throw new Error('Blog no encontrado')

    const actual = blogs[indice]
    const titulo = (payload?.titulo || '').trim()
    const slug = slugUnico(payload?.slug || titulo || actual.slug, id)
    const estado = payload?.estado || actual.estado
    const actualizadoEn = ahoraIso()

    const actualizado = {
      ...actual,
      titulo,
      slug,
      extracto: (payload?.extracto || '').trim(),
      subtitulo: (payload?.subtitulo || '').trim(),
      epigrafe: (payload?.epigrafe || '').trim(),
      contenido: (payload?.contenido || '').trim(),
      imagenPortada: (payload?.imagenPortada || '').trim(),
      imagenes: limpiarUrls(payload?.imagenes),
      estado,
      actualizadoEn,
      publicadoEn:
        actual.publicadoEn || (estado === ESTADO.PUBLICADO ? actualizadoEn : actual.publicadoEn),
      eliminadoEn: estado === ESTADO.ELIMINADO ? actual.eliminadoEn || actualizadoEn : null
    }

    blogs[indice] = actualizado
    return clonar(actualizado)
  },

  async pausarBlogAdmin(id) {
    await dormir()
    validarSesion()
    const blog = blogs.find((item) => item.id === id)
    if (!blog) throw new Error('Blog no encontrado')
    if (blog.estado === ESTADO.ELIMINADO) throw new Error('No se puede pausar un blog eliminado')

    blog.estado = blog.estado === ESTADO.PAUSADO ? ESTADO.PUBLICADO : ESTADO.PAUSADO
    blog.actualizadoEn = ahoraIso()
    if (blog.estado === ESTADO.PUBLICADO && !blog.publicadoEn) {
      blog.publicadoEn = blog.actualizadoEn
    }
    return clonar(blog)
  },

  async eliminarBlogAdmin(id) {
    await dormir()
    validarSesion()
    const blog = blogs.find((item) => item.id === id)
    if (!blog) throw new Error('Blog no encontrado')

    blog.estado = ESTADO.ELIMINADO
    blog.eliminadoEn = ahoraIso()
    blog.actualizadoEn = blog.eliminadoEn
    return clonar(blog)
  }
}

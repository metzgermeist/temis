const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const request = async (ruta, opciones = {}) => {
  const respuesta = await fetch(`${API_BASE_URL}${ruta}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(opciones.headers || {})
    },
    credentials: 'include',
    ...opciones
  })

  if (!respuesta.ok) {
    let mensaje = 'Error de API'
    try {
      const data = await respuesta.json()
      mensaje = data?.message || mensaje
    } catch (_error) {
      mensaje = respuesta.statusText || mensaje
    }
    throw new Error(mensaje)
  }

  if (respuesta.status === 204) return null
  return respuesta.json()
}

export const httpBlogApi = {
  async obtenerModo() {
    return { modo: 'api' }
  },

  async obtenerSesionAdmin() {
    return request('/admin/auth/me')
  },

  async loginAdmin(payload) {
    return request('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async logoutAdmin() {
    return request('/admin/auth/logout', { method: 'POST' })
  },

  async listarBlogsPublicos() {
    return request('/blogs')
  },

  async obtenerBlogPublicoPorSlug(slug) {
    return request(`/blogs/${slug}`)
  },

  async listarBlogsAdmin() {
    return request('/admin/blogs')
  },

  async crearBlogAdmin(payload) {
    return request('/admin/blogs', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
  },

  async editarBlogAdmin(id, payload) {
    return request(`/admin/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
  },

  async pausarBlogAdmin(id) {
    return request(`/admin/blogs/${id}/pause`, { method: 'PATCH' })
  },

  async eliminarBlogAdmin(id) {
    return request(`/admin/blogs/${id}/delete`, { method: 'PATCH' })
  }
}


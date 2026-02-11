import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { blogApi } from '../services/blogApi'

const AuthContexto = createContext(null)

export function ProveedorAuth({ children }) {
  const [sesion, setSesion] = useState(null)
  const [cargandoSesion, setCargandoSesion] = useState(true)

  useEffect(() => {
    let activo = true

    async function cargarSesion() {
      try {
        const sesionActual = await blogApi.obtenerSesionAdmin()
        if (!activo) return
        setSesion(sesionActual)
      } catch (_error) {
        if (!activo) return
        setSesion(null)
      } finally {
        if (activo) {
          setCargandoSesion(false)
        }
      }
    }

    cargarSesion()

    return () => {
      activo = false
    }
  }, [])

  const iniciarSesion = async (credenciales) => {
    const siguienteSesion = await blogApi.loginAdmin(credenciales)
    setSesion(siguienteSesion)
    return siguienteSesion
  }

  const cerrarSesion = async () => {
    await blogApi.logoutAdmin()
    setSesion(null)
  }

  const valor = useMemo(() => {
    return {
      sesion,
      esAdmin: Boolean(sesion?.token),
      cargandoSesion,
      iniciarSesion,
      cerrarSesion
    }
  }, [sesion, cargandoSesion])

  return <AuthContexto.Provider value={valor}>{children}</AuthContexto.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContexto)
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de ProveedorAuth')
  }
  return contexto
}


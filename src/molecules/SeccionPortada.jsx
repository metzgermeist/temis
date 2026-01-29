// Importar dependencias necesarias.
import { useEffect, useState } from 'react'
import './SeccionPortada.css'
import BotonPrimario from '../atoms/BotonPrimario.jsx'

// Seccion de portada con mensaje principal y llamada a la accion.
function SeccionPortada() {
  // Datos de impacto para reforzar confianza.
  let indicadores = [
    {
      id: 'casos',
      valor: 350,
      prefijo: '+',
      sufijo: '',
      detalle: 'Casos resueltos con resultados favorables.'
    },
    {
      id: 'clientes',
      valor: 98,
      prefijo: '',
      sufijo: '%',
      detalle: 'Clientes que recomiendan el estudio.'
    },
    {
      id: 'respuesta',
      valor: 24,
      prefijo: '',
      sufijo: ' hs',
      detalle: 'Tiempo promedio de respuesta inicial.'
    }
  ]

  // Estado para animar los valores de los indicadores.
  let [valores, setValores] = useState(
    indicadores.reduce((acc, indicador) => {
      acc[indicador.id] = 0
      return acc
    }, {})
  )

  // Animar los numeros cuando el bloque entra en viewport.
  useEffect(() => {
    let inicio = null
    let duracion = 2400
    let animacion = null
    let observador = null

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3)
    }

    function animar(timestamp) {
      if (!inicio) inicio = timestamp
      let progreso = Math.min((timestamp - inicio) / duracion, 1)
      let avance = easeOutCubic(progreso)
      let siguiente = {}

      indicadores.forEach((indicador) => {
        siguiente[indicador.id] = Math.round(indicador.valor * avance)
      })

      setValores(siguiente)

      if (progreso < 1) {
        animacion = requestAnimationFrame(animar)
      }
    }

    function iniciarAnimacion() {
      if (animacion) return
      animacion = requestAnimationFrame(animar)
    }

    observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((entrada) => entrada.isIntersecting)) {
          iniciarAnimacion()
          if (observador) observador.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    let objetivo = document.querySelector('.hero__estadisticas')
    if (objetivo) {
      observador.observe(objetivo)
    } else {
      iniciarAnimacion()
    }

    return () => {
      if (animacion) cancelAnimationFrame(animacion)
      if (observador) observador.disconnect()
    }
  }, [])

  // Renderizar cada indicador en lista.
  function RenderizarIndicador(indicador) {
    let valor = valores[indicador.id] ?? 0
    return (
      <li key={indicador.id} className="hero__indicador">
        <strong className="hero__indicador-titulo">
          {indicador.prefijo}
          {valor}
          {indicador.sufijo}
        </strong>
        <p className="hero__indicador-detalle">{indicador.detalle}</p>
      </li>
    )
  }

  // Renderizar la seccion de portada con contenido principal.
  return (
    <section className="hero-bloque">
      <section className="hero animacion-aparecer" aria-labelledby="titulo-hero">
        {/* Bloque principal con titulo y mensaje */}
        <article className="hero__contenido">
          <p className="hero__etiqueta">Estudio juridico contemporaneo</p>
          <h1 id="titulo-hero">Defendemos tus derechos con estrategia y cercania.</h1>
          <p className="hero__descripcion">
            Soluciones legales integrales para personas y empresas, con comunicacion clara y
            resultados medibles.
          </p>
          <section className="hero__acciones" aria-label="Acciones principales">
            <BotonPrimario
              texto="Agendar consulta"
              enlace="#contacto"
              etiqueta="Agendar una consulta legal"
            />
            <a className="hero__enlace" href="#casos">
              Ver casos destacados
            </a>
          </section>
        </article>
      </section>
      {/* Indicadores de confianza por fuera del hero */}
      <section className="hero__estadisticas" aria-label="Resultados destacados">
        <div className="hero__estadisticas-contenedor">
          <p className="hero__estadisticas-titulo">Resultados que generan confianza</p>
          <ul className="hero__lista-indicadores">{indicadores.map(RenderizarIndicador)}</ul>
        </div>
      </section>
    </section>
  )
}

export default SeccionPortada

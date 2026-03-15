// Importar dependencias necesarias.
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SeccionCasos.css'
import fotoCasa3D from '../../img/casa3d.png'
import fotoLadon3D from '../../img/ladon3d.png'
import fotoLaboral3D from '../../img/laboral3d (1).png'
import fotoComercial3D from '../../img/comercial3d (1).png'
import fotoCongreso3D from '../../img/congreso3d.png'
import fotoAdministrativo3D from '../../img/administrativo3d.png'

gsap.registerPlugin(ScrollTrigger)

// Seccion que muestra los casos y servicios del estudio con layout 3D.
function SeccionCasos() {
  // Datos de los servicios ofrecidos, algunos con img 3D y otros esperando asset.
  let casos = [
    {
      id: 'derecho-civil-comercializacion',
      titulo: 'Derecho Civil y Comercialización',
      descripcion: 'Solidez en contratos civiles y comerciales. Resguardamos tu patrimonio corporativo y personal estructurando operaciones blindadas contra riesgos.',
      enlace: '/servicios/derecho-civil-comercializacion',
      imagen: fotoComercial3D
    },
    {
      id: 'derecho-laboral',
      titulo: 'Derecho Laboral',
      descripcion: 'Defendemos intereses con contundencia técnica. Abordamos reclamos, indemnizaciones complejas y negociaciones de alto nivel con empleadores.',
      enlace: '/servicios/derecho-laboral',
      imagen: fotoLaboral3D
    },
    {
      id: 'derecho-constitucional-amparos',
      titulo: 'Derecho Constitucional',
      descripcion: 'Nuestra máxima especialidad. Litigios de amparo y férrea defensa de las garantías fundamentales establecidas en la constitución.',
      enlace: '/servicios/derecho-constitucional-amparos',
      imagen: fotoCongreso3D
    },
    {
      id: 'derecho-administrativo',
      titulo: 'Derecho Administrativo',
      descripcion: 'Intercedemos ante la burocracia. Trámites, procedimientos sumarios y representación eficiente frente a todos los organismos públicos del Estado.',
      enlace: '/servicios/derecho-administrativo',
      imagen: fotoAdministrativo3D
    },
    {
      id: 'derecho-familia-sucesiones',
      titulo: 'Familia y Sucesiones',
      descripcion: 'Acompañamiento humano y certero en momentos críticos. Divorcios de alta complejidad, mediación de cuidado personal y juicios sucesorios.',
      enlace: '/servicios/derecho-familia-sucesiones',
      imagen: fotoCasa3D
    },
    {
      id: 'derecho-penal',
      titulo: 'Derecho Penal',
      descripcion: 'Diseñamos estrategias de litigación penal audaces y herméticas para blindar tu defensa en causas de extrema complejidad y sensibilidad.',
      enlace: '/servicios/derecho-penal',
      imagen: fotoLadon3D
    }
  ]

  let filasRef = useRef([])

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      filasRef.current.forEach((fila) => {
        if (!fila) return
        gsap.fromTo(fila,
          { opacity: 0, y: 150, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: fila,
              start: "top 80%",
            }
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  function RenderizarFila(caso, index) {
    let esReverso = index % 2 !== 0
    return (
      <li 
        key={caso.id} 
        className={`seccion-casos__fila ${esReverso ? 'seccion-casos__fila--reverso' : ''}`}
        ref={(el) => (filasRef.current[index] = el)}
      >
        <div className="seccion-casos__bloque-imagen">
          {caso.imagen ? (
            <img src={caso.imagen} alt={caso.titulo} className="seccion-casos__imagen-3d" loading="lazy" />
          ) : (
            <div className="seccion-casos__bloque-imagen--placeholder">
              <span>Modelo 3D en camino</span>
            </div>
          )}
        </div>
        <div className="seccion-casos__bloque-texto">
          <h3 className="seccion-casos__titulo-fila">{caso.titulo}</h3>
          <p className="seccion-casos__desc-fila">{caso.descripcion}</p>
          <a href={caso.enlace} className="seccion-casos__enlace">
            Conocer más →
          </a>
        </div>
      </li>
    )
  }

  // Renderizar la seccion de casos con fondo oscuro y filas inmersivas.
  return (
    <section className="seccion-casos" id="casos" aria-labelledby="titulo-casos">
      <header className="seccion-casos__encabezado">
        <p className="seccion-casos__etiqueta">Áreas de Práctica</p>
        <h2 id="titulo-casos">Especialidad de alto nivel <br/>para cada desafío legal.</h2>
      </header>
      <ul className="seccion-casos__lista">
        {casos.map(RenderizarFila)}
      </ul>
    </section>
  )
}

export default SeccionCasos






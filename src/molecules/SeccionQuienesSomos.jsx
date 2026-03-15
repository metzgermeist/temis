// Importar dependencias necesarias.
import { useState, useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SeccionQuienesSomos.css'
import TarjetaAbogado from '../atoms/TarjetaAbogado.jsx'
import BotonWhatsApp from '../atoms/BotonWhatsApp.jsx'
import fotoCarlos from '../../img/canevaro.png'
import fotoMirtha from '../../img/mirtha.jpeg'

gsap.registerPlugin(ScrollTrigger)

// Seccion que presenta el estudio y a sus abogados.
function SeccionQuienesSomos() {
  // Datos de los abogados que conforman el estudio.
  let abogados = [
    {
      id: 'abogado-canevaro',
      nombre: 'Dr. Carlos Canevaro',
      especialidad: 'Derecho laboral - derecho constitucional - derecho civil',
      descripcion: 'Brinda asesoramiento jurídico estratégico y representación sólida en conflictos laborales, constitucionales y civiles.',
      cv: (
        <>
          <p>El Dr. Carlos Rodolfo Canevaro es abogado con una destacada trayectoria en el ámbito jurídico, académico e institucional. Cuenta con una sólida formación especializada, incluyendo maestrías en Derecho Procesal y en Justicia Constitucional y Derechos Humanos, además de múltiples diplomaturas y especializaciones en derecho administrativo, constitucional y procesal.</p>
          <p>A lo largo de su carrera ha ejercido importantes funciones públicas, entre ellas Legislador de la Provincia de Tucumán, Subsecretario de Estado del Interior y Coordinador de Municipios y Comunas de la provincia. Paralelamente desarrolla actividad académica como docente universitario y participa activamente en instituciones y asociaciones vinculadas al derecho constitucional y procesal.</p>
          <p>Su trabajo profesional se caracteriza por el compromiso con la defensa de los derechos, el análisis jurídico riguroso y la búsqueda de soluciones legales sólidas y estratégicas para cada caso.</p>
        </>
      ),
      telefono: '+54 9 3815 90-4189',
      foto: fotoCarlos
    },
    {
      id: 'abogada-morales',
      nombre: 'Dra. Mirtha Analia Morales',
      especialidad: 'Derecho empresarial - derecho comercial - derecho de familia',
      descripcion: 'Asesora empresas y particulares en asuntos comerciales y familiares, con enfoque claro y soluciones prácticas.',
      cv: <p>Especialista en derecho de familia con mas de 15 años de experiencia. Su enfoque se centra en la mediación y la resolución pacífica de conflictos familiares, priorizando siempre el bienestar de los menores involucrados. Ha participado en dictar seminarios sobre nuevas configuraciones familiares en el derecho argentino contemporáneo.</p>,
      telefono: '+54 9 11 9876 5432',
      foto: fotoMirtha
    }
  ]

  let [abogadoExpandido, setAbogadoExpandido] = useState(null)
  
  // Referencias para animaciones GSAP
  let seccionRef = useRef(null)
  let encabezadoRef = useRef(null)
  let tarjetasRef = useRef([])

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Efecto Cascada (Stagger) para los textos del encabezado
      gsap.fromTo(
        encabezadoRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: seccionRef.current,
            start: "top 80%",
          }
        }
      )

      // 2. Efecto Cascada para las tarjetas
      gsap.fromTo(
        tarjetasRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.3,
          ease: "elastic.out(1, 0.6)", // Rebote agresivo
          scrollTrigger: {
            trigger: ".seccion-quienes__tarjetas",
            start: "top 85%",
          }
        }
      )

      // 3. Efecto Parallax sutil (escala interior) para las fotos
      gsap.utils.toArray('.tarjeta-abogado__foto').forEach(foto => {
        gsap.fromTo(foto,
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: foto,
              start: "top 90%",
              end: "bottom 30%",
              scrub: true
            }
          }
        )
      })

    }, seccionRef)

    return () => ctx.revert()
  }, [])

  function abrirModal(abogado) {
    setAbogadoExpandido(abogado)
    // Prevenir scroll en el body cuando el modal está abierto
    document.body.style.overflow = 'hidden'
  }

  function cerrarModal() {
    setAbogadoExpandido(null)
    // Restaurar scroll
    document.body.style.overflow = 'auto'
  }

  // Renderizar cada abogado con su tarjeta correspondiente.
  function RenderizarAbogado(abogado, index) {
    return (
      <TarjetaAbogado
        key={abogado.id}
        ref={(el) => (tarjetasRef.current[index] = el)}
        nombre={abogado.nombre}
        especialidad={abogado.especialidad}
        descripcion={abogado.descripcion}
        foto={abogado.foto}
        onConoceme={() => abrirModal(abogado)}
      />
    )
  }

  // Renderizar la seccion quienes somos completa.
  return (
    <>
      <section className="seccion-quienes" id="equipo" aria-labelledby="titulo-quienes" ref={seccionRef}>
        {/* Encabezado principal de la seccion */}
        <header className="seccion-quienes__encabezado" ref={encabezadoRef}>
          <p className="seccion-quienes__etiqueta">Quienes somos</p>
          <h2 id="titulo-quienes">Un equipo legal que combina tecnica y cercania.</h2>
          <p className="seccion-quienes__descripcion">
            Trabajamos con metodologia clara, reportes constantes y una mirada estrategica para proteger
            tus intereses.
          </p>
        </header>
        {/* Tarjetas con los perfiles del estudio */}
        <section className="seccion-quienes__tarjetas" aria-label="Abogados del estudio">
          {abogados.map(RenderizarAbogado)}
        </section>
      </section>

      {/* Modal Desplegable */}
      {abogadoExpandido && (
        <div className="modal-abogado__overlay" onClick={cerrarModal}>
          <div className="modal-abogado__contenido" onClick={(e) => e.stopPropagation()}>
            <button className="modal-abogado__cerrar" aria-label="Cerrar modal" onClick={cerrarModal}>
              ✕
            </button>
            
            <div className="modal-abogado__grid">
              <div className="modal-abogado__columna-foto">
                {abogadoExpandido.foto && (
                  <img 
                    src={abogadoExpandido.foto} 
                    alt={abogadoExpandido.nombre} 
                    className="modal-abogado__foto"
                  />
                )}
              </div>
              <div className="modal-abogado__columna-texto">
                <h3 className="modal-abogado__nombre">{abogadoExpandido.nombre}</h3>
                <p className="modal-abogado__especialidad-modal">{abogadoExpandido.especialidad}</p>
                
                <div className="modal-abogado__cv">
                  {abogadoExpandido.cv ? (
                    abogadoExpandido.cv
                  ) : (
                    <p>{abogadoExpandido.descripcion} Cuenta con amplia experiencia y trayectoria brindando un asesoramiento de primer nivel orientado a resolver conflictos con la mayor celeridad y eficacia posible. Su enfoque moderno prioriza siempre la estrategia mas adecuada para la situación del cliente.</p>
                  )}
                </div>
                
                <div className="modal-abogado__contacto-wrap">
                  <BotonWhatsApp 
                    numero={abogadoExpandido.telefono} 
                    texto="Hablemos" 
                    etiqueta={`Contactar a ${abogadoExpandido.nombre} por WhatsApp`} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SeccionQuienesSomos

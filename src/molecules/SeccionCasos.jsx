// Importar dependencias necesarias.
import './SeccionCasos.css'
import TarjetaCaso from '../atoms/TarjetaCaso.jsx'

// Seccion que muestra los casos y servicios del estudio.
function SeccionCasos() {
  // Datos de los servicios ofrecidos.
  let casos = [
    {
      id: 'derecho-civil-comercializacion',
      titulo: 'Derecho civil y comercializacion',
      descripcion: 'Contratos civiles y comerciales, responsabilidad y resguardo patrimonial.',
      enlace: '/servicios/derecho-civil-comercializacion'
    },
    {
      id: 'derecho-laboral',
      titulo: 'Derecho laboral',
      descripcion: 'Reclamos laborales, despidos, indemnizaciones y negociaciones con empleadores.',
      enlace: '/servicios/derecho-laboral'
    },
    {
      id: 'derecho-constitucional-amparos',
      titulo: 'Derecho constitucional - amparos',
      descripcion: 'Acciones de amparo y tutela de derechos fundamentales.',
      enlace: '/servicios/derecho-constitucional-amparos'
    },
    {
      id: 'derecho-administrativo',
      titulo: 'Derecho administrativo',
      descripcion: 'Tramites, reclamos y procedimientos frente a organismos publicos.',
      enlace: '/servicios/derecho-administrativo'
    },
    {
      id: 'derecho-familia-sucesiones',
      titulo: 'Derecho de familia y sucesiones',
      descripcion: 'Divorcios, alimentos, cuidado personal y sucesiones.',
      enlace: '/servicios/derecho-familia-sucesiones'
    },
    {
      id: 'derecho-penal',
      titulo: 'Derecho penal',
      descripcion: 'Defensa penal y estrategia en causas complejas.',
      enlace: '/servicios/derecho-penal'
    }
  ]

  // Renderizar cada tarjeta de caso.
  function RenderizarCaso(caso) {
    return (
      <TarjetaCaso
        key={caso.id}
        titulo={caso.titulo}
        descripcion={caso.descripcion}
        enlace={caso.enlace}
        etiqueta={`Ir a detalle de ${caso.titulo}`}
      />
    )
  }

  // Renderizar la seccion de casos con sus tarjetas.
  return (
    <section className="seccion-casos animacion-aparecer" id="casos" aria-labelledby="titulo-casos">
      {/* Encabezado de la seccion de casos */}
      <header className="seccion-casos__encabezado">
        <p className="seccion-casos__etiqueta">Casos que resolvemos</p>
        <h2 id="titulo-casos">Servicios legales especializados para cada desafio.</h2>
        <p className="seccion-casos__descripcion">
          Cada servicio tiene una pagina dedicada con detalles del proceso y beneficios.
        </p>
      </header>
      {/* Lista de tarjetas de casos */}
      <ul className="seccion-casos__lista">{casos.map(RenderizarCaso)}</ul>
    </section>
  )
}

export default SeccionCasos






// Importar dependencias necesarias.
import './SeccionValores.css'
import ItemValor from '../atoms/ItemValor.jsx'

// Seccion que destaca los valores del estudio.
function SeccionValores() {
  // Lista de valores institucionales.
  let valores = [
    {
      id: 'transparencia',
      titulo: 'Ética y Transparencia',
      descripcion: 'Informamos cada paso del proceso con lenguaje claro y reportes frecuentes.',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
          <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M12 12l0 2.5" />
        </svg>
      )
    },
    {
      id: 'estrategia',
      titulo: 'Cercanía Real',
      descripcion: 'Cada caso se aborda con un plan legal disenado para tus objetivos reales.',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
        </svg>
      )
    },
    {
      id: 'compromiso',
      titulo: 'Estrategia de Excelencia',
      descripcion: 'Mantenemos comunicacion directa y respuestas rapidas para tomar decisiones seguras.',
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M12 6l0 14" />
          <path d="M9 13l6 -6" />
          <path d="M15 13l-6 -6" />
        </svg>
      )
    }
  ]

  // Renderizar cada valor como item de lista.
  function RenderizarValor(valor) {
    return (
      <ItemValor 
        key={valor.id} 
        titulo={valor.titulo} 
        descripcion={valor.descripcion} 
        icono={valor.icono} 
      />
    )
  }

  // Renderizar la seccion completa de valores.
  return (
    <section className="seccion-valores animacion-aparecer" id="valores" aria-labelledby="titulo-valores">
      {/* Encabezado de la seccion de valores */}
      <header className="seccion-valores__encabezado">
        <p className="seccion-valores__etiqueta">Nuestra Esencia</p>
        <h2 id="titulo-valores">Más que abogados, somos tus aliados estratégicos.</h2>
        <div className="seccion-valores__esencia">
          <p>
            Creemos que el derecho no debe ser distante ni incomprensible. 
            Nuestra visión se centra en deconstruir la imagen tradicional del estudio jurídico, 
            ofreciendo un espacio donde la excelencia técnica se encuentra con la genuina calidez humana.
          </p>
          <p>
            Liderados por Carlos Canevaro, no solo resolvemos conflictos: diseñamos caminos 
            seguros para la tranquilidad de tu futuro y el de tu familia.
          </p>
        </div>
      </header>
      {/* Lista de valores en formato visual */}
      <ul className="seccion-valores__lista">{valores.map(RenderizarValor)}</ul>
    </section>
  )
}

export default SeccionValores

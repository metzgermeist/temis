// Importar dependencias necesarias.
import './SeccionValores.css'
import ItemValor from '../atoms/ItemValor.jsx'

// Seccion que destaca los valores del estudio.
function SeccionValores() {
  // Lista de valores institucionales.
  let valores = [
    {
      id: 'transparencia',
      titulo: 'Transparencia constante',
      descripcion: 'Informamos cada paso del proceso con lenguaje claro y reportes frecuentes.'
    },
    {
      id: 'estrategia',
      titulo: 'Estrategia personalizada',
      descripcion: 'Cada caso se aborda con un plan legal disenado para tus objetivos reales.'
    },
    {
      id: 'compromiso',
      titulo: 'Compromiso cercano',
      descripcion: 'Mantenemos comunicacion directa y respuestas rapidas para tomar decisiones seguras.'
    }
  ]

  // Renderizar cada valor como item de lista.
  function RenderizarValor(valor) {
    return <ItemValor key={valor.id} titulo={valor.titulo} descripcion={valor.descripcion} />
  }

  // Renderizar la seccion completa de valores.
  return (
    <section className="seccion-valores animacion-aparecer" id="valores" aria-labelledby="titulo-valores">
      {/* Encabezado de la seccion de valores */}
      <header className="seccion-valores__encabezado">
        <p className="seccion-valores__etiqueta">Valores del estudio</p>
        <h2 id="titulo-valores">Principios que guian nuestro camino</h2>
      </header>
      {/* Lista de valores en formato visual */}
      <ul className="seccion-valores__lista">{valores.map(RenderizarValor)}</ul>
    </section>
  )
}

export default SeccionValores






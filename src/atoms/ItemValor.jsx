// Importar dependencias necesarias.
import './ItemValor.css'

// Item de lista para describir un valor del estudio.
function ItemValor(props) {
  // Texto principal del valor.
  let titulo = props.titulo

  // Descripcion breve del valor.
  let descripcion = props.descripcion

  // Icono SVG del valor.
  let icono = props.icono

  // Renderizar el valor con una marca visual.
  return (
    <li className="item-valor">
      <div className="item-valor__icono" aria-hidden="true">
        {icono}
      </div>
      <article className="item-valor__contenido">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
      </article>
    </li>
  )
}

export default ItemValor






// Importar dependencias necesarias.
import { forwardRef } from 'react'
import './TarjetaAbogado.css'
import BotonWhatsApp from './BotonWhatsApp.jsx'
import BotonAnimado from './BotonAnimado.jsx'

// Tarjeta informativa para presentar a cada abogado del estudio.
const TarjetaAbogado = forwardRef((props, ref) => {
  // Nombre profesional del abogado.
  let nombre = props.nombre

  // Especialidad principal del abogado.
  let especialidad = props.especialidad

  // Descripcion corta del perfil.
  let descripcion = props.descripcion

  // Callback para abrir el modal expansivo
  let onConoceme = props.onConoceme

  // Foto del abogado si aplica.
  let foto = props.foto

  // Renderizar la tarjeta con estructura semantica.
  return (
    <article className="tarjeta-abogado" ref={ref}>
      {foto ? (
        <div className="tarjeta-abogado__marco-foto">
          <img
            className="tarjeta-abogado__foto"
            src={foto}
            alt={nombre}
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}
      {/* Encabezado principal de la tarjeta */}
      <header className="tarjeta-abogado__encabezado">
        <h3>{nombre}</h3>
        <p className="tarjeta-abogado__especialidad">{especialidad}</p>
      </header>
      {/* Resumen profesional del abogado */}
      <p className="tarjeta-abogado__descripcion">{descripcion}</p>
      <address className="tarjeta-abogado__contacto">
        <BotonAnimado onClick={onConoceme} texto="Conóceme" className="tarjeta-abogado__accion" />
      </address>
    </article>
  )
})

export default TarjetaAbogado






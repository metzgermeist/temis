// Importar dependencias necesarias.
import './TarjetaAbogado.css'
import BotonWhatsApp from './BotonWhatsApp.jsx'

// Tarjeta informativa para presentar a cada abogado del estudio.
function TarjetaAbogado(props) {
  // Nombre profesional del abogado.
  let nombre = props.nombre

  // Especialidad principal del abogado.
  let especialidad = props.especialidad

  // Descripcion corta del perfil.
  let descripcion = props.descripcion

  // Telefono para contacto via WhatsApp.
  let telefono = props.telefono

  // Foto del abogado si aplica.
  let foto = props.foto

  // Texto del boton de contacto.
  let textoBoton = props.textoBoton

  // Etiqueta accesible del boton.
  let etiquetaBoton = props.etiquetaBoton

  // Renderizar la tarjeta con estructura semantica.
  return (
    <article className="tarjeta-abogado">
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
      {/* Zona de contacto con WhatsApp */}
      <address className="tarjeta-abogado__contacto">
        <BotonWhatsApp numero={telefono} texto={textoBoton} etiqueta={etiquetaBoton} />
      </address>
    </article>
  )
}

export default TarjetaAbogado






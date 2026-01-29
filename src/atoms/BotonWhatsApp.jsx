// Importar dependencias necesarias.
import './BotonWhatsApp.css'

// Boton especializado para abrir un chat de WhatsApp.
function BotonWhatsApp(props) {
  // Numero recibido desde la tarjeta del abogado.
  let numero = props.numero

  // Texto del boton para invitar a la conversacion.
  let texto = props.texto

  // Etiqueta accesible para describir la accion.
  let etiqueta = props.etiqueta

  // Limpiar el numero para compatibilidad con WhatsApp.
  let numeroLimpio = numero.replace(/\D/g, '')

  // Generar el enlace final de WhatsApp.
  let enlace = `https://wa.me/${numeroLimpio}`

  // Renderizar el boton con estilo corporativo.
  return (
    <a className="boton-whatsapp" href={enlace} aria-label={etiqueta} target="_blank" rel="noreferrer">
      {texto}
    </a>
  )
}

export default BotonWhatsApp






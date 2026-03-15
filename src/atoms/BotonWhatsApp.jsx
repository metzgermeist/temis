// Importar dependencias necesarias.
import './BotonWhatsApp.css'
import BotonAnimado from './BotonAnimado.jsx'

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
    <BotonAnimado 
      href={enlace} 
      texto={texto} 
      className="boton-whatsapp__animado" 
      target="_blank" 
      rel="noreferrer" 
      aria-label={etiqueta}
    />
  )
}

export default BotonWhatsApp






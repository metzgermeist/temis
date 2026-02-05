// Boton flotante de WhatsApp con tooltip de contacto.
import './BotonWhatsAppFlotante.css'

function BotonWhatsAppFlotante(props) {
  let numero = props.numero
  let instagramUsuario = props.instagramUsuario

  let numeroLimpio = numero.replace(/\D/g, '')
  let enlace = `https://wa.me/${numeroLimpio}`
  let instagramLimpio = instagramUsuario ? instagramUsuario.replace(/^@/, '') : ''
  let enlaceInstagram = instagramLimpio ? `https://instagram.com/${instagramLimpio}` : ''

  return (
    <div className="whatsapp-tooltip" aria-live="polite">
      <div className="whatsapp-tooltip__botones">
        <div className="whatsapp-tooltip__contenedor">
          <div className="whatsapp-tooltip__boton" aria-label="Abrir datos de WhatsApp">
            <svg aria-hidden="true" viewBox="0 0 32 32" height="18" width="18">
              <path
                fill="currentColor"
                d="M16.01 4C9.39 4 4 9.39 4 16c0 2.34.67 4.62 1.94 6.6L4 28l5.55-1.84A12.01 12.01 0 0 0 28 16C28 9.39 22.63 4 16.01 4zm6.96 16.3c-.3.84-1.74 1.64-2.44 1.72-.6.08-1.36.12-2.2-.14-.5-.16-1.16-.38-1.98-.74-3.48-1.52-5.74-5.2-5.92-5.44-.16-.24-1.4-1.86-1.4-3.54 0-1.68.88-2.5 1.2-2.84.3-.34.7-.42.94-.42h.68c.22 0 .52-.02.8.6.3.68 1.02 2.34 1.1 2.52.08.18.14.4.02.64-.12.24-.18.4-.36.62-.18.22-.38.5-.54.66-.18.18-.36.38-.16.74.2.36.9 1.5 1.94 2.44 1.34 1.18 2.48 1.54 2.84 1.72.36.18.56.16.78-.1.22-.26.9-1.04 1.14-1.4.24-.36.48-.3.8-.18.32.12 2.04.96 2.4 1.14.36.18.6.26.68.4.08.14.08.84-.22 1.68z"
              />
            </svg>
            WhatsApp
          </div>
          <div className="whatsapp-tooltip__menu" role="menu">
            <a
              className="whatsapp-tooltip__item"
              href={enlace}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir chat de WhatsApp con el numero ${numero}`}
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" height="16" width="16">
                <path
                  fill="currentColor"
                  d="m4.6.7 1.6 1.7c.6.6.7 1.6 0 2.2C5 6.1 5 6.4 7.2 8.7c2.4 2.4 2.7 2.4 4.2 1 .6-.5 1.6-.5 2.2 0l1.7 1.7v.1c.6.5.6 1.5 0 2.1v.1c-1.4 1.4-2.5 2-3.8 2h-.7c-1.6-.3-3.4-1.6-6.1-4.4C-.5 6.1-1 4 2.3.7 2.9.1 3.9.1 4.6.7m-1.2.4c-.2 0-.4.1-.5.3C.1 4 .5 5.9 5.3 10.7s6.6 5.2 9.3 2.4l.2.1-.2-.1c.3-.3.3-.7.1-1L13 10.4a.7.7 0 0 0-1 0c-1.9 1.8-2.7 1.6-5.3-1C4 6.6 3.8 5.8 5.6 4c.3-.3.3-.7 0-1L3.9 1.3a.7.7 0 0 0-.5-.2"
                />
              </svg>
              {numero}
            </a>
          </div>
        </div>
        {enlaceInstagram ? (
          <a
            className="whatsapp-tooltip__boton whatsapp-tooltip__boton--instagram"
            href={enlaceInstagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir Instagram ${instagramUsuario}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" height="18" width="18">
              <path
                fill="currentColor"
                d="M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Zm0 8.6a5.4 5.4 0 1 1 0-10.8 5.4 5.4 0 0 1 0 10.8Zm6.7-11.2a1.26 1.26 0 1 1 0-2.52 1.26 1.26 0 0 1 0 2.52ZM17 3.5H7A3.5 3.5 0 0 0 3.5 7v10A3.5 3.5 0 0 0 7 20.5h10A3.5 3.5 0 0 0 20.5 17V7A3.5 3.5 0 0 0 17 3.5Zm2 13.5A2 2 0 0 1 17 19H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10Z"
              />
            </svg>
            Instagram
          </a>
        ) : null}
      </div>
    </div>
  )
}

export default BotonWhatsAppFlotante

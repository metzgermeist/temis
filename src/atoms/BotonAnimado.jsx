import './BotonAnimado.css'

function BotonAnimado({ texto, href, onClick, className = '', target, rel, ...props }) {
  const contenido = (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="arr-2" viewBox="0 0 24 24">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
      <span className="text">{texto}</span>
      <span className="circle" />
      <svg xmlns="http://www.w3.org/2000/svg" className="arr-1" viewBox="0 0 24 24">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </>
  )

  if (href) {
    return (
      <a href={href} className={`boton-animado ${className}`} onClick={onClick} target={target} rel={rel} {...props}>
        {contenido}
      </a>
    )
  }

  return (
    <button className={`boton-animado ${className}`} onClick={onClick} type="button" {...props}>
      {contenido}
    </button>
  )
}

export default BotonAnimado

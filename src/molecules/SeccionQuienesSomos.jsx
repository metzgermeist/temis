// Importar dependencias necesarias.
import './SeccionQuienesSomos.css'
import TarjetaAbogado from '../atoms/TarjetaAbogado.jsx'
import fotoCarlos from '../../img/canevaro.png'

// Seccion que presenta el estudio y a sus abogados.
function SeccionQuienesSomos() {
  // Datos de los abogados que conforman el estudio.
  let abogados = [
    {
      id: 'abogado-canevaro',
      nombre: 'Dr. Carlos Canevaro',
      especialidad: 'Derecho constitucional',
      descripcion:
        'Acompaña procesos patrimoniales con enfoque humano y precision legal, buscando acuerdos sostenibles.',
      telefono: '+54 9 3815 90-4189',
      foto: fotoCarlos
    },
    {
      id: 'abogada-morales',
      nombre: 'Dra. Mirtha Analia Morales',
      especialidad: 'Derecho de familia',
      descripcion:
        'Acompaña procesos de familia con escucha activa, claridad juridica y acuerdos sostenibles.',
      telefono: '+54 9 11 9876 5432'
    }
  ]

  // Renderizar cada abogado con su tarjeta correspondiente.
  function RenderizarAbogado(abogado) {
    return (
      <TarjetaAbogado
        key={abogado.id}
        nombre={abogado.nombre}
        especialidad={abogado.especialidad}
        descripcion={abogado.descripcion}
        telefono={abogado.telefono}
        foto={abogado.foto}
        textoBoton="Escribir por WhatsApp"
        etiquetaBoton={`Contactar a ${abogado.nombre} por WhatsApp`}
      />
    )
  }

  // Renderizar la seccion quienes somos completa.
  return (
    <section className="seccion-quienes animacion-aparecer" id="quienes-somos" aria-labelledby="titulo-quienes">
      {/* Encabezado principal de la seccion */}
      <header className="seccion-quienes__encabezado">
        <p className="seccion-quienes__etiqueta">Quienes somos</p>
        <h2 id="titulo-quienes">Un equipo legal que combina tecnica y cercania.</h2>
        <p className="seccion-quienes__descripcion">
          Trabajamos con metodologia clara, reportes constantes y una mirada estrategica para proteger
          tus intereses.
        </p>
      </header>
      {/* Tarjetas con los perfiles del estudio */}
      <section className="seccion-quienes__tarjetas" aria-label="Abogados del estudio">
        {abogados.map(RenderizarAbogado)}
      </section>
    </section>
  )
}

export default SeccionQuienesSomos






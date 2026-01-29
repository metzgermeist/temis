// Importar dependencias necesarias.
import React from 'react'
import { createRoot } from 'react-dom/client'
import Aplicacion from './Aplicacion.jsx'

// Buscar el contenedor principal donde se montara la aplicacion.
let contenedor = document.querySelector('#app')

// Crear la raiz de React para renderizar la interfaz.
let raiz = createRoot(contenedor)

// Renderizar la aplicacion principal con modo estricto.
raiz.render(
  <React.StrictMode>
    <Aplicacion />
  </React.StrictMode>
)






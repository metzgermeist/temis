// Importar dependencias necesarias.
import React from 'react'
import { createRoot } from 'react-dom/client'
import Aplicacion from './Aplicacion.jsx'

// Buscar el contenedor principal donde se montara la aplicacion.
let contenedor = document.querySelector('#app')

// Crear la raiz de React para renderizar la interfaz.
let raiz = createRoot(contenedor)

// Configurador del Intersection Observer global
const observerConfig = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animado');
      observer.unobserve(entry.target);
    }
  });
}, observerConfig);

// Inicializar observador después del render
setTimeout(() => {
  document.querySelectorAll('.animacion-aparecer').forEach(element => {
    observer.observe(element);
  });
}, 500);

// Renderizar la aplicacion principal con modo estricto.
raiz.render(
  <React.StrictMode>
    <Aplicacion />
  </React.StrictMode>
)






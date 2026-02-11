const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER || ''

const esArchivoImagen = (archivo) => {
  return Boolean(archivo && archivo.type && archivo.type.startsWith('image/'))
}

export async function subirImagenACloudinary(archivo) {
  if (!esArchivoImagen(archivo)) {
    throw new Error('El archivo seleccionado no es una imagen valida.')
  }

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      'Falta configurar Cloudinary. Define VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET.'
    )
  }

  const formData = new FormData()
  formData.append('file', archivo)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  if (CLOUDINARY_FOLDER) {
    formData.append('folder', CLOUDINARY_FOLDER)
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
  const respuesta = await fetch(endpoint, {
    method: 'POST',
    body: formData
  })

  if (!respuesta.ok) {
    let mensaje = 'No se pudo subir la imagen a Cloudinary.'
    try {
      const errorData = await respuesta.json()
      mensaje = errorData?.error?.message || mensaje
    } catch (_error) {
      mensaje = respuesta.statusText || mensaje
    }
    throw new Error(mensaje)
  }

  const data = await respuesta.json()
  if (!data?.secure_url) {
    throw new Error('Cloudinary no devolvio una URL publica para la imagen.')
  }

  return data.secure_url
}

export function cloudinaryConfigurado() {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET)
}


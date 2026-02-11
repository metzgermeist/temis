import { useEffect, useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './EditorTextoRico.css'

const ESTADO_BOTONES_INICIAL = {
  negrita: false,
  cursiva: false,
  lista: false,
  listaNumerada: false
}

function obtenerEstadoBotones(editor) {
  if (!editor) return ESTADO_BOTONES_INICIAL

  const marcasGuardadas = editor.state.storedMarks || editor.state.selection.$from.marks()

  return {
    negrita:
      editor.isActive('bold') || marcasGuardadas.some((marca) => marca.type.name === 'bold'),
    cursiva:
      editor.isActive('italic') || marcasGuardadas.some((marca) => marca.type.name === 'italic'),
    lista: editor.isActive('bulletList'),
    listaNumerada: editor.isActive('orderedList')
  }
}

function EditorTextoRico({ valor, onChange }) {
  const [estadoEditor, setEstadoEditor] = useState(ESTADO_BOTONES_INICIAL)
  const editor = useEditor({
    extensions: [StarterKit],
    content: valor || '',
    editorProps: {
      attributes: {
        class: 'editor-rico__contenido',
        spellcheck: 'true'
      }
    },
    onUpdate({ editor: editorActual }) {
      onChange(editorActual.getHTML())
    }
  })

  useEffect(() => {
    if (!editor) return
    const contenidoActual = editor.getHTML()
    if ((valor || '') !== contenidoActual) {
      editor.commands.setContent(valor || '', { emitUpdate: false })
    }
  }, [editor, valor])

  useEffect(() => {
    if (!editor) return

    const actualizarEstado = () => setEstadoEditor(obtenerEstadoBotones(editor))

    actualizarEstado()
    editor.on('selectionUpdate', actualizarEstado)
    editor.on('transaction', actualizarEstado)
    editor.on('focus', actualizarEstado)
    editor.on('blur', actualizarEstado)

    return () => {
      editor.off('selectionUpdate', actualizarEstado)
      editor.off('transaction', actualizarEstado)
      editor.off('focus', actualizarEstado)
      editor.off('blur', actualizarEstado)
    }
  }, [editor])

  const manejarAccion = (accion) => {
    if (!editor) return
    accion()
    setEstadoEditor(obtenerEstadoBotones(editor))
  }

  if (!editor) {
    return <div className="editor-rico">Cargando editor...</div>
  }

  return (
    <section className="editor-rico">
      <nav className="editor-rico__barra" aria-label="Herramientas de formato">
        <button
          type="button"
          className={`editor-rico__boton${estadoEditor.negrita ? ' editor-rico__boton--activo' : ''}`}
          onClick={() => manejarAccion(() => editor.chain().focus().toggleBold().run())}
        >
          Negrita
        </button>
        <button
          type="button"
          className={`editor-rico__boton${estadoEditor.cursiva ? ' editor-rico__boton--activo' : ''}`}
          onClick={() => manejarAccion(() => editor.chain().focus().toggleItalic().run())}
        >
          Cursiva
        </button>
        <button
          type="button"
          className={`editor-rico__boton${estadoEditor.lista ? ' editor-rico__boton--activo' : ''}`}
          onClick={() => manejarAccion(() => editor.chain().focus().toggleBulletList().run())}
        >
          Lista
        </button>
        <button
          type="button"
          className={`editor-rico__boton${estadoEditor.listaNumerada ? ' editor-rico__boton--activo' : ''}`}
          onClick={() => manejarAccion(() => editor.chain().focus().toggleOrderedList().run())}
        >
          Lista numerada
        </button>
      </nav>
      <EditorContent editor={editor} />
    </section>
  )
}

export default EditorTextoRico

import { useState } from 'react'
import { FormularioProducto } from '../FormularioProducto/FormularioProducto'
import styles from './FormularioContainer.module.css'

export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: '',
    precio: '',
    stock: ''
  })
  const [imagenFile, setImagenFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setDatosForm({
      ...datosForm,
      [name]: value
    })
  }

  const manejarCambioImagen = (e) => {
    setImagenFile(e.target.files[0])
  }

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setMensaje(null)

    if (!imagenFile) {
      alert('Por favor, selecciona una imagen')
      return
    }

    setLoading(true)

    try {
      console.log('Datos del formulario:', { ...datosForm, imagen: imagenFile.name })
      await new Promise(resolve => setTimeout(resolve, 1500))

      setMensaje({ tipo: 'exito', texto: 'Producto recibido correctamente (modo demostración)' })

      setDatosForm({ nombre: '', precio: '', stock: '' })
      setImagenFile(null)
    } catch (error) {
      console.error('Error:', error)
      setMensaje({ tipo: 'error', texto: 'Hubo un error al procesar el producto' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>Agregar Producto</h2>
      {mensaje && (
        <div className={mensaje.tipo === 'exito' ? styles.successMsg : styles.errorMsg}>
          {mensaje.texto}
        </div>
      )}
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
        loading={loading}
      />
    </div>
  )
}

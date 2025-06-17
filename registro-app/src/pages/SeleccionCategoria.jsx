import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SeleccionCategoria() {
  const [categoria, setCategoria] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (categoria) {
      navigate(`/registro/${categoria}`)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-md p-6">
        <img src="https://github.com/Yagogo39/FrontendProyecto/blob/main/registro-app/public/logo.jpeg?raw=true" alt="Descripción" className="w-40 mx-auto"/>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Selecciona tu categoría
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            {['estudiante', 'administrativo', 'libre'].map((option) => (
              <div key={option} className="flex items-center p-3 bg-white rounded border border-gray-200">
                <input
                  id={option}
                  name="categoria"
                  type="radio"
                  value={option}
                  checked={categoria === option}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor={option} className="ml-3 block text-sm font-medium text-gray-700 capitalize">
                  {option}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={!categoria}
            className={`w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white ${categoria ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  )
}
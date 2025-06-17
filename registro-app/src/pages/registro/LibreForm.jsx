import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LibreForm() {

  const [formData, setFormData] = useState({
    rfid: '',
    name: '',
    lastName1: '',
    lastName2: '',
    username: '',
    password: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validación básica
    if (!formData.rfid || !formData.name || !formData.lastName1 || !formData.username || !formData.password) {
      setError('Todos los campos marcados con * son obligatorios');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://apiproyecto-hz8w.onrender.com/api/register/libre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: formData.username,
            password: formData.password
          },
          participant: {
            rfid: formData.rfid,
            name: formData.name,
            lastName1: formData.lastName1,
            lastName2: formData.lastName2
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      // Redirigir a página de éxito
      navigate('/registro-exitoso', {
        state: {
          username: formData.username,
          name: `${formData.name} ${formData.lastName1}`,
          userType: 'libre'
        }
      });

      alert('¡Registro exitoso! Por favor inicia sesión.');
      navigate('/registro-exitoso');
    } catch (err) {
      console.error('Error en el registro:', err);
      setError(err.message || 'Error al registrar estudiante');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registro de Participante Libre
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Campos específicos para usuarios libres */}
            
            <div>
              <label htmlFor="rfid" className="block text-sm font-medium text-gray-700">
                RFID *
              </label>
              <input
                id="rfid"
                name="rfid"
                type="text"
                required
                value={formData.rfid}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="lastName1" className="block text-sm font-medium text-gray-700">
                Apellido Paterno *
              </label>
              <input
                id="lastName1"
                name="lastName1"
                type="text"
                required
                value={formData.lastName1}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="lastName2" className="block text-sm font-medium text-gray-700">
                Apellido Materno
              </label>
              <input
                id="lastName2"
                name="lastName2"
                type="text"
                required
                value={formData.lastName2}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Usuario *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

          
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
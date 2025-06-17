import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdministrativoForm() {
  const [formData, setFormData] = useState({
    rfid: '',
    name: '',
    lastName1: '',
    lastName2: '',
    major: 'Ing. Sistemas Computacionales', // Valor por defecto
    rol: '1', // Valor por defecto (como string)
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

    // Validación mejorada
    const requiredFields = {
      rfid: 'RFID',
      name: 'Nombre',
      lastName1: 'Apellido Paterno',
      username: 'Usuario',
      password: 'Contraseña',
      rol: 'Puesto'
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key])
      .map(([_, label]) => label);

    if (missingFields.length > 0) {
      setError(`Los siguientes campos son obligatorios: ${missingFields.join(', ')}`);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://apiproyecto-hz8w.onrender.com/api/register/administrative', {
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
            lastName2: formData.lastName2 || null // Permitir nulo
          },
          administrative: {
            major: formData.major,
            rol: formData.rol // Ya es string
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro administrativo');
      }

      // Redirigir a página de éxito
      navigate('/registro-exitoso', {
        state: {
          username: formData.username,
          name: `${formData.name} ${formData.lastName1}`,
          userType: 'administrative'
        }
      });
      
    } catch (err) {
      console.error('Error en el registro:', err);
      setError(err.message || 'Error al registrar usuario administrativo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Registro de Personal Administrativo
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="rfid" className="block text-sm font-medium text-gray-700">
                RFID <span className="text-red-500">*</span>
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
                Nombre <span className="text-red-500">*</span>
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
                Apellido Paterno <span className="text-red-500">*</span>
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
                value={formData.lastName2}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="major" className="block text-sm font-medium text-gray-700">
                Departamento/Área
              </label>
              <select
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="Ing. Sistemas Computacionales">Ing. Sistemas Computacionales</option>
                <option value="Ing. Civil">Ing. Civil</option>
                <option value="Ing. Mecatronica">Ing. Mecatronica</option>
                <option value="Ing. Industrial">Ing. Industrial</option>
                <option value="Administración">Administración</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="Dirección">Dirección</option>
              </select>
            </div>

            <div>
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700">
                Puesto/Rol <span className="text-red-500">*</span>
              </label>
              <select
                id="rol"
                name="rol"
                required
                value={formData.rol}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="1">Administrador</option>
                <option value="2">Docente</option>
                <option value="3">Coordinador</option>
                <option value="4">Jefe de Departamento</option>
                <option value="5">Director</option>
                <option value="6">Personal de Apoyo</option>
              </select>
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nombre de Usuario <span className="text-red-500">*</span>
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
                Contraseña <span className="text-red-500">*</span>
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
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
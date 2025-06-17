// src/pages/SuccessPage.js
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

export default function RegistroExitoso() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <h2 className="mt-3 text-2xl font-bold text-gray-900">¡Registro Exitoso!</h2>
        <p className="mt-2 text-gray-600">
          Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión con tus credenciales.
        </p>
        <a
          href="https://react-js-proyect.onrender.com/"
          className="mt-2 text-gray-600 hover:text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://react-js-proyect.onrender.com/
        </a>
      </div>
    </div>
  );
}
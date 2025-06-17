import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SeleccionCategoria from "./pages/SeleccionCategoria";
import EstudianteForm from "./pages/registro/EstudianteForm";
import AdministrativoForm from "./pages/registro/AdministrativoForm";
import LibreForm from "./pages/registro/LibreForm";
import RegistroExitoso from "./pages/RegistroExitoso";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SeleccionCategoria />,
  },
  {
    path: '/registro/estudiante',
    element: <EstudianteForm />,
  },
  {
    path: '/registro/administrativo',
    element: <AdministrativoForm />,
  },
  {
    path: '/registro/libre',
    element: <LibreForm />,
  },
  {
    path: '/registro-exitoso',
    element: <RegistroExitoso />
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
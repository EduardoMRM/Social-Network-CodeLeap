import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingUp from './Pages/SignUp';
import MainScreen from './Pages/MainScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SingUp />,
  },
  {
    path: "/MainScreen",
    element: <MainScreen />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

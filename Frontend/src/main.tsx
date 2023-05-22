import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { RequireAuth } from './middlewares/RequireAuth';
import { ReverseAuth } from './middlewares/ReverseAuth';
import { EmployeeMiddleware } from './middlewares/EmployeeMiddleware';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ReverseAuth><LandingPage/></ReverseAuth>,
    errorElement: <ErrorPage/>
  },
  { 
    path: "/entrar",
    element: <ReverseAuth><LoginPage/></ReverseAuth>
  },
  {
    path: "/registro",
    element: <ReverseAuth>/registro</ReverseAuth>
  },
  {
    path: "/pedir",
    element: <RequireAuth>/pedir</RequireAuth>
  },
  {
    path: "/carrinho",
    element: <RequireAuth>/carrinho</RequireAuth>
  },
  {
    path: "/perfil",
    element: <RequireAuth>/perfil</RequireAuth>
  },
  {
    path: "/pedidos",
    element: <EmployeeMiddleware>/pedidos</EmployeeMiddleware>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <RouterProvider router={router}/>

)

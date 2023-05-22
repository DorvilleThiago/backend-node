import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { RequireAuth } from './components/RequireAuth';
import { ReverseAuth } from './components/ReverseAuth';

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
    path: "/pedir",
    element: <RequireAuth>/pedir</RequireAuth>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <RouterProvider router={router}/>

)

import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import LandingPage from './pages/LandingPage'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage';

function loginIfNotLogged(page: any) {
  const loggedIn = true;
  if (loggedIn) {
    return page
  } else {
    return <Navigate to="/entrar" replace/>
  }
}

//function indexRedirect() {
//  const loggedIn = false;
//  if (loggedIn) {
//    return null
//  } else {
//    return <LandingPage/>
//  }
//}

const router = createBrowserRouter([
  {
    path: "/",
    element: loginIfNotLogged(<LandingPage/>),
    errorElement: <ErrorPage />
  },
  {
    path: "/entrar",
    element: <LoginPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)

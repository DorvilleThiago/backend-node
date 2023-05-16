import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import LandingPage from './pages/LandingPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <>Página não encontrada</>
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router={router} />
)

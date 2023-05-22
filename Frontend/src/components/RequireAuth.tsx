import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }: any) => {

  const [pagina, setPagina] = useState(<>Carregando...</>)
  const location = useLocation();

  useEffect(() => {
   const log = async() => {
      const resposta = await fetch('http://localhost:8000/validate', {
        method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': ''+localStorage.getItem('token')
         }
      });
      if (resposta.status === 200) {
        setPagina(children)
      } else {
        setPagina(<Navigate to='/entrar'/>)
      }
    }
  log()
  }, [location])
  
  return pagina
  
};

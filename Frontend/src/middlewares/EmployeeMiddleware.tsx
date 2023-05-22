import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const EmployeeMiddleware = ({ children }: any) => {

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
      const check = await resposta.json()
     if (resposta.status === 200 && check.employee) {
        setPagina(children)
      } else {
        setPagina(<Navigate to='/'/>)
      }
    }
  log()
  }, [location])
  
  return pagina
  
};

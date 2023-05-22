import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ReverseAuth = ({ children }: any) => {

  const [page, setPage] = useState(<>Carregando...</>)
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
        const check = await resposta.json()
       if (check.employee) {
         setPage(<Navigate to='/pedidos' />)
       } else {
         setPage(<Navigate to='/pedir' />)
       }
      } else {
        setPage(children)
      }
    }
  log()
  }, [location])
  
  return page
  
};

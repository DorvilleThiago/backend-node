import { FormEvent, useRef, useState } from "react"
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {

    const [emailState, setEmailState] = useState('')
    const [passwordState, setPasswordState] = useState('')
    const [verified, setVerified] = useState(false)
    const [token, setToken] = useState<string | null>(null);
  
    const captchaObj = useRef(null) 
  
    const handleVerify = (token: string | null) => {
      console.log(token); // Access the token here
      setToken(token);
      setVerified(true);
    };
      
    async function Submit(event: FormEvent<HTMLFormElement>, email: string, password: string) {
      event.preventDefault();
      try {
       const response = await fetch('http://localhost:8000/login', {
         method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            captcha: token
          }),
       });
        if (response.ok) { 
          const resposta = await response.json();
          localStorage.setItem('token', resposta.token);
          console.log('logado')
      } 
      } catch (err) {
        console.log('Erro:', err);
      }
  }

    return (<>
        <form onSubmit={(event) => Submit(event, emailState, passwordState)}>
            <div>
                <label htmlFor="email"></label>
                <input type="email" id="email" onChange={event => setEmailState(event.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password"></label>
          <input type="password" id="password" onChange={event => setPasswordState(event.target.value)}></input>
          <ReCAPTCHA
            ref={captchaObj}
            theme="dark"
            onChange={handleVerify}
            sitekey={import.meta.env.VITE_REACT_APP_SITE_KEY}
          />
        </div>
        
        <button  disabled={!verified} type="submit">logar</button>
        <Link to="/">Clique aqui voltar</Link>
        </form>
    </>)
}
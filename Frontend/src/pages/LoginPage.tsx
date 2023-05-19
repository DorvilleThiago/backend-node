import { FormEvent, useState } from "react"

export default function LoginPage() {

    const [emailState, setEmailState] = useState('')
    const [passwordState, setPasswordState] = useState('')
      
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
            password
          }),
       });
        if (response.ok) { 
          console.log('tá logadinho eim')
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
            </div>
            <button type="submit">logar</button>
        </form>
    </>)
}
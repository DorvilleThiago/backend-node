import { useState } from "react"

export default function LoginPage() {

    const [emailState, setEmailState] = useState('')
    const [passwordState, setPasswordState] = useState('')

    async function Submit(email: string, password: string){
        fetch('http://localhost:8000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
    }

    return (<>
        <form onSubmit={() => Submit(emailState, passwordState)}>
            <div>
                <label htmlFor="email"></label>
                <input type="email" id="email" onChange={event => setPasswordState(event.target.value)}></input>
            </div>
            <div>
                <label htmlFor="password"></label>
                <input type="password" id="password" onChange={event => setEmailState(event.target.value)}></input>
            </div>
            <button type="submit">logar</button>
        </form>
    </>)
}
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (<>
        <h1>página principal</h1>
        <Link to="/login">Clique aqui para fazer login</Link>
    </>)
}
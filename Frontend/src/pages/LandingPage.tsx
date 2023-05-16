import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (<>
        <h1 className='text-green-400'>página principal</h1>
        <Link to="/login">Clique aqui para fazer login</Link>
    </>)
}
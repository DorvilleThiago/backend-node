import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (<>
        <h1>ERRO 404 Página não encontrada</h1>
        <Link to='/'>Voltar a página principal</Link>
    </>)
}
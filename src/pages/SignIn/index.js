import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import './signin.css';


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, loadinAuth} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    
    if(email !== '' && password !== ''){
      signIn(email, password)
    }
  }

  return (
    <div className="container-center">
    <div className="login">
      <div className="logo-area">
        <h1>OfsSy</h1>
      </div>

        <form onSubmit={handleSubmit}>
          <h2>Entrar</h2>
          <input type="text" placeholder='nome@etec.sp.gov.br' value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />
          <button type="submit">{loadinAuth ? 'Carregando...' : 'Acessar'}</button>
        </form>  

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
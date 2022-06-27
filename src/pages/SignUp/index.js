
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { Route, Redirect } from 'react-router-dom';

import './signup.css';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rm, setRm] = useState('');
  const [cargo, setCargo] = useState('Técnico');

  const { signUp, loadinAuth } = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    
    if(nome !== '' && email !== '' && password !== ''){
      signUp(email, password, nome, cargo, rm);
      
    }

  }

  function selectCargo (e){
    setCargo(e.target.value);
    console.log(e.target.value);
  }

  function toLimit(int = 0){
    int.value = int.value.substring(5,10);
}


  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <h1>SIGOS</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <h2>Cadastrar uma conta</h2>
          <input type="text" required placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input className='btn-rm' type='number' required placeholder='RM' value={rm} onChange={(e) => setRm(e.target.value)} min={5} maxLength={10} />
          <input type="text" required placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>

          <select value={cargo} onChange={(e) => {setCargo(e.target.value);}}>
                <option value='Técnico'>Técnico</option>
                <option value='Professor(a)' >Professor(a)</option>
                <option value='Diretor(a)'>Diretor(a)</option>
                <option value='Secretario(a)'>Secretario(a)</option>
            </select>
          <input type="password" required placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) }  minLength={5}/>
          <button type="submit">{loadinAuth ? 'Carregando...' : 'Acessar'}</button>
        </form>  

        <Link to="/">Já tem uma conta? Entre</Link>
      </div>
    </div>
  );
}

export default SignUp;

import './header.css';
import {AuthContext} from '../../contexts/auth';
import { useContext } from 'react';
import avatar from '../../assets/avatar.png'
import { Link } from 'react-router-dom'
import { FiHome, FiPlus, FiSettings } from "react-icons/fi";
import Title from '../Title';

export default function Header (){
  const {user} = useContext(AuthContext);
  
  return(
    <div className='sidebar'>
      <div>
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl } alt="Foto avatar" />
      </div>
      <Link to='/dashboard'><FiHome color="#FFF" size={24}/>Chamados</Link>
      <Link to='/new'> <FiPlus color="#FFF" size={24}/>Novo Chamado</Link>
      <Link to='/Profile'><FiSettings color="#FFF" size={24}/>Configurações</Link>
    </div>
  )
}

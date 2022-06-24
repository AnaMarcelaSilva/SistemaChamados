import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){
  const { signed, loading } = useContext(AuthContext);



  if(loading){
    return(
      <div></div>
    )
  }

  // Verificando se o usuário esta logado no sistema e retornando a tela de login caso não esteja.
  if(!signed && isPrivate){
    return <Redirect to="/" />
  }

    //Verificando se está logado e retornando a tela de painel caso esteja.
  if(signed && !isPrivate){
    return <Redirect to="/dashboard" />
  }


  return(
    <Route
      {...rest}
      render={ props => (
        <Component {...props} />
      )}
    />
  )
}

import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';
import { toast } from 'react-toastify';

  import SignUp from '../pages/SignUp';


//Criando uma constante para ultilizar o creatContext
export const AuthContext = createContext({});


function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cargo, setCargo] = useState("");

  <SignUp setCargo={cargo}/>

  //Salvando as insformações do locarStrage na constante storegeUser quando a págiana é aberta.
  useEffect(()=>{

    function loadStorage(){
      const storageUser = localStorage.getItem('SistemaUser');

      //Transformando o conteudo da constante em objeto novamente e setando o valor da mesma na constante user.
      if(storageUser){
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
  
      setLoading(false);
    }
    
    loadStorage();

  }, [])

  //Realizando o login de um usuário
  async function signIn(email, password){
    setLoadingAuth(true);

    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid;

      const userProfile = await firebase.firestore().collection('users').doc(uid).get();

      let data = {
        uid: uid,
        nome: userProfile.data().nome,
        avatarUrl: userProfile.data().avatarUrl,
        cargo: userProfile.data().cargo,
        rm: userProfile.data().rm,
        email: value.user.email
      }

      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
      toast.success('Bem-vindo(a) de volta!');

    })
    .catch((error)=>{
      console.log(error);
      toast.error('Ops, algo deu errado!');
      setLoadingAuth(false);
    })

  }

  //Cadastrando um novo usuario
  async function signUp(email, password, nome, cargo, rm){
    setLoadingAuth(true);

    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async (value)=>{
      let uid = value.user.uid;

      await firebase.firestore().collection('users')
      .doc(uid).set({
        nome: nome,
        avatarUrl: null,
        email: email,
        rm: rm,
        cargo: cargo
      })
      .then( () => {

        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email,
          avatarUrl: null,
          rm: rm,
         cargo: cargo
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success('Bem-vindo(a) a plataforma!');

      })

    })

    //Caso a ciração do usuário não seja bem sucedida, mostrar o erro no console.
    .catch((error)=>{
      console.log(error);
      toast.error('Ops, algo deu errado!');
      setLoadingAuth(false);

    })

  }

  function storageUser(data){
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }

 //Logout do usuario
 async function signOut(){
  await firebase.auth().signOut();
  localStorage.removeItem('SistemaUser');
  setUser(null);
}


return(
  <AuthContext.Provider 
  value={{ 
    signed: !!user,  
    user, 
    loading, 
    signUp,
    signOut,
    signIn,
    loadingAuth,
    setUser,
    storageUser
  }}
  >
    {children}
  </AuthContext.Provider>
)
}

export default AuthProvider;

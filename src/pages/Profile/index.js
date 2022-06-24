import './Profile.css';
import { useContext, useState} from 'react';
import '../../components/Header';
import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiSettings, FiUpload} from 'react-icons/fi';
import { AuthContext } from '../../contexts/auth';
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection';
import { toast } from 'react-toastify';


export default function Profile(){
  const {user, setUser, signOut, storageUser} = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [rm, setRm] = useState(user && user.rm);
  const [cargo, setCargo] = useState(user && user.cargo);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

//pré visualização da imagem **Não tá funcionando**
  function handleFile(e){

    if(e.target.files[0]){
      const image = e.target.files[0];

      
      if(image.type === 'image/jpeg' || image.type === 'image/png'){

        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))

        alert("PQ NÃO TÁ SALVANDO SENHOR");

      }else{
        alert('Envie uma imagem do tipo PNG ou JPEG');
        setImageAvatar(null);
        return null;
        alert(" o q tá rolando");
      }

    }

  }

  //Enviando a imagem para o storage
  async function handleUpload(){
    const currentUid = user.uid;

    const uploadTask = await firebase.storage()
    .ref(`images/${currentUid}/${imageAvatar.name}`)
    .put(imageAvatar)
    .then( async () => {
      console.log('FOTO ENVIADA COM SUCESSO!');

      await firebase.storage().ref(`images/${currentUid}`)
      .child(imageAvatar.name).getDownloadURL()
      .then( async (url)=>{
        let urlFoto = url;

        //enviando a url da imagem para o firestore
        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          avatarUrl: urlFoto,
          nome: nome
        })
        .then(()=>{
          let data = {
            ...user,
            avatarUrl: urlFoto,
            nome: nome
          }; 
          setUser(data);
          storageUser(data);
        })

      })
      .catch((error) =>{
        console.log(error)
      })
    })
  }

  //Salvando foto na aplicação e enviando a url da imagem para o firestore 
  async function handleSave(e){
  e.preventDefault();
  
  if(imageAvatar === null && nome !== ''){
    await firebase.firestore().collection('users')
    .doc(user.uid)
    .update({
      nome: nome
    })
    .then(()=>{
      let data = {
        ...user,
        nome: nome
      };
      setUser(data);
      storageUser(data);
      toast.success('Campo atualizado!');
    })
  }
  else if(imageAvatar !== null && nome !== ''){
    handleUpload();
  }
  
}

  return(
    <div>
      <Header/>

        <div className='content'>
          <Title name='Meu perfil'>
          <FiSettings size={25}/>
          </Title>

          <div className='container'>
            <form className='form-profile' onSubmit={handleSave}>
              <label className='label-avatar'>
                <span>
                  <FiUpload size={25} color='#FFF'/>
                </span>

                <input type='file' accept='image/*' onChange={handleFile}/>
                <br/>
                {avatarUrl === null ? 
                <img src={avatar} width='250' height='250' alt='Foto de perfil do usuário'/>
                :<img src={avatar} width='250' height='250' alt='Foto de perfil do usuário'/>}
              </label>

              <label>Nome</label>
              <input type='text' value={nome} onChange={(e) => setNome(e.target.value)}/>

              <label>Cargo</label>
              <input type='text' value={cargo} disabled={true}/>

              <label>RM</label>
              <input type='text' value={rm} disabled={true}/>

              <label>E-mail</label>
              <input type="text" value={email} disabled={true} /> 

              <button type='submit' className='salvar-btn'>Salvar</button>

            </form>
          </div>
          <div className='sair-btn'>
          <button type='submit' onClick={() => signOut ()} className='logout-btn'>Sair</button>
          </div>
      </div>
    </div>
  )
}
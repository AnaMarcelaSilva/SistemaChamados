import Header from '../../components/Header';
import Title from '../../components/Title';
import {FiPlus} from 'react-icons/fi';
import { toast } from 'react-toastify';


import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { useHistory, useParams } from 'react-router-dom';

import './new.css';

export default function New(){
  const {id} = useParams(); //buscar dados na url que correspodem a id
  const history = useHistory();

  const {user, setUser} = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, SetEmail] = useState(user && user.email);
  const [rm, SetRm] = useState(user && user.rm);
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [descricao, setDescricao] = useState('');
  const [codigo, setCodigo] = useState(0);
  const [edit, setEdit] = useState(false);


  useEffect(()=>{
    loadId();
    setEdit(true);
      
  }, [id])

  async function loadId(){
  await firebase.firestore().collection('chamados').doc(id)
  .get()
  .then((snapshot)=>{
    setAssunto(snapshot.data().assunto);
    setStatus(snapshot.data().status);
    setDescricao(snapshot.data().descricao);
    setCodigo(snapshot.data().codigo);
    setNome(snapshot.data().nome);
    SetEmail(snapshot.data().email);

    setEdit(true)
  })
  .catch((error)=>{
    console.log('erro no id passado', error);
  })
}

  async function Register(e){
    e.preventDefault();
/*  let gerarNum = codigo;
      gerarNum++;
      while(gerarNum <= codigo){
        gerarNum++;
        setCodigo(gerarNum);
      }
      setCodigo(gerarNum);
      console.log(codigo); */

      if(edit){
        await firebase.firestore().collection('chamados')
        .doc(id)
        .update({
          requerente: nome,
          email: email,
          assunto: assunto,
          status: status,
          descricao: descricao,
          rm: rm,
          codigo: codigo
        })
        .then(()=>{
          toast.success('Chamados editado com sucesso!');
          history.push('/dashboard')
          setDescricao("");
        })
        .catch((error)=>{
          console.log(error);
          toast.error("Falha ao editar chamado, tente mais tarde!")
        })
        return;
      }

    await firebase.firestore().collection("chamados")
    .add({
      created: new Date(),
      requerente: nome,
      email: email,
      assunto: assunto,
      status: status,
      descricao: descricao,
      rm: rm,
      codigo: codigo
    }) 
    .then(()=>{
      toast.success("Chamado registrado com sucesso!");
      setDescricao("");
    })
    .catch((error)=>{
      toast.error("Algo deu errado ao registrar, tente novamente.")
      console.log(error);
    })
  }

  //A função é chamada quando é selecionado o assunto
  function ChangeSelect(e){
    setAssunto(e.target.value);
    console.log(e.target.value)
  }
  
  //A função é chamada quando o status é selecionado
  function ChangeOption(e){
    setStatus(e.target.value);
    console.log(e.target.value);
  }

  return(
    <div>
      <Header />

      <div className='content'>
        <Title name='Novo chamado'>
          <FiPlus size={25}/>
        </Title>

        <div className='container'>
          <form className='form-profile' onSubmit={Register}  >
            <label>Requerente</label>
            <input type='text' value={nome} disabled={true}/>
            <label>E-mail</label>
            <input type='text' value={email} disabled={true}/>

            <label>Assunto</label>
            <select value={assunto} onChange={ChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Equipamento">Equipamento com defeito</option>
              <option value="Internet">Falta de internet</option>              
            </select>

            <label>Status</label>
            <div className='status'>
              <input 
              type='radio'
              name='radio'
              value='Aberto'
              onChange={ChangeOption}
              checked={status === 'Aberto' ? true : false}
              />
              <span>Em Aberto</span>

              <input 
              type='radio'
              name='radio'
              value='Progesso'
              onChange={ChangeOption}
              checked={status === 'Progesso' ? true : false}
              />
              <span>Em progresso</span>

              <input 
              type='radio'
              name='radio'
              value='Atendido'
              onChange={ChangeOption}
              checked={status === 'Atendido' ? true : false}
              />
              <span>Atendido</span>
            </div>

            <label>Descrição</label>
            <textarea required placeholder='Descreva seu problema aqui.' value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            <button type='submit' className='salvar-btn'>Salvar</button>
          </form>

        </div>

      </div>
    </div>
  )
}
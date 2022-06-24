import { useState, useEffect } from 'react';
import {FiMessageSquare, FiPlus, FiSearch, FiEdit2} from 'react-icons/fi';
import './dashboard.css';
import { toast } from 'react-toastify';

import Title from '../../components/Title';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';

import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns';

export default function Dashboard(){

  //criando constante que acessa os chamados no firebase e ordena pala data de criação
  const listRef = firebase.firestore().collection('chamados').orderBy('created', 'desc');

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const [postModal, setPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    loadChamados();

    //Buscando chamados no firebase
    async function loadChamados(){
      await listRef
      .get()
      .then((snapshot)=>{
        updateState(snapshot);
      })
      .catch((error)=>{
        console.log('Deu algum erro: ', error);
      })
  
      setLoading(false);
    }

  }, [])
  
  async function updateState (snapshot){
    const collectionEmpty = snapshot.size ===0;

    //verificando se a coleção não está vazia
    if(!collectionEmpty){
      let lista=[];

      //percorrendo os documentos do firebesa e buscando dados
      snapshot.forEach((doc)=>{
        lista.push({
          assunto: doc.data().assunto,
          created: doc.data().created,
          createdFormatad: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          createdDescricao: format(doc.data().created.toDate(), 'dd/MM/yyyy HH:mm'),
          descricao: doc.data().descricao,
          email: doc.data().email,
          requerente: doc.data().requerente,
          rm: doc.data().rm,
          status: doc.data().status,
          codigo: doc.data().codigo,
          id: doc.id
        })
      })

      //Constante que pega o ultimo documento carregado
      const lastDoc = snapshot.docs[snapshot.docs.length -1];

      setChamados(chamados => [...lista]);
      
    }else{
      setIsEmpty(true);
    }
  }

  //Renderização enquanto busca novos chamados
  if(loading){
    return(
      <div>
        <Header/>
      
        <div className='content'>
          <Title name='Atendimentos'>
          <FiMessageSquare size={25}/>
          </Title>
        </div>

        <div className='container dashboard'>
          <span>Buscando novos chamados...</span>
        </div>
      </div>
    )
  }

  //Função para abrir/fechar modal através do seu valor(true or false)
  function search(item){
    setPostModal(!postModal);
    console.log(postModal);
    setDetail(item); 
  }

  return(
    <div>
      <Header/>
      
      <div className='content'>
        <Title name='Atendimentos'>
        <FiMessageSquare size={25}/>
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
          )  :( <>
              <Link to="/new" className="new">
                  <FiPlus size={25} color="#FFF"/>
                  Novo chamado
                </Link>
                <table>
                  <thead>
                    <tr className='tr-head'>
                      <th>Código</th>
                      <th className='requerente'>Requerente</th>
                      <th>Assunto</th>
                      <th>Status</th>
                      <th>Criado em</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {chamados.map((item, index)=>{
                      return(
                        <tr key={index}>
                        <td>{item.codigo}</td>
                        <td className='requerente'>{item.requerente}</td>
                        <td className='email'>{item.email}</td>
                        <td >{item.assunto}</td>
                        <td>
                          <span className='badge' style={{backgroundColor: item.status === 'Aberto' || item.status === "Progesso" ? '#5cb58c' : '#999' }}>{item.status}</span>
                        </td>
                        <td>{item.createdFormatad}</td>
                        <td>
                          <button className='action' style={{backgroundColor: '#3583f6'}} onClick={()=> search(item)}>
                            <FiSearch color='#FFF' size={17}/>
                          </button>
                          <Link className='action' style={{backgroundColor: '#f6a935'}} to={`/new/${item.id}`}>
                            <FiEdit2 color='#FFF' size={17}/>
                          </Link>
                        </td>
                      </tr>
                      )
                    })}              
                  </tbody>
                </table>
            </>
        )}
            
      </div>

     {postModal && (
       <Modal
       item={detail}
        close={search}
       />
     )}               

    </div>
  )
}
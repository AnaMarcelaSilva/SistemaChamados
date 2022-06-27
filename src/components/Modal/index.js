import './modal.css';
import { FiX } from 'react-icons/fi'
import { useEffect } from 'react';

export default function Modal({item, close, responsavel}){

  const numId = item.id.replace(/[^0-9]/g, '');
  const id = parseInt(numId);

  useEffect(()=>{
    console.log(responsavel)
  })

  return(
    <div className='modal'>
      <div className='container'>
        <button className='close' onClick={close}>
          <FiX size={25} color="#FFF"/>
          Voltar
        </button>

      <div>
        <h2>Detalhe do chamado: <i>{id}</i></h2>

        <div className='row'>
          <span>
            Requerente: <a>{item.requerente}</a>
          </span>
          <span>
            Email: <a>{item.email}</a>
          </span>
        </div>

        <div className='row'>
          <span>
            Assunto: <a>{item.assunto}</a>
          </span>
          <span>
            Criado em: <a>{item.createdDescricao}</a>
          </span>
        </div>

        <div className='row'>
          <span>
            Status: <a style={{color:"#FFF", backgroundColor: item.status === 'Aberto' || item.status === "Progesso" ? '#5cb58c' : '#999' }}>{item.status}</a>
          </span>
        </div>
        <>
            <h3>Descrição</h3> 
            <p>{item.descricao}</p>
        </>
        { item.solucao != '' &&
        <div id='solucao'>
           <h3 >Solução: </h3> 
            <p>{item.solucao}</p>
            <hr></hr>
            <i>Por {item.responsavel}</i>
        </div>
        }
      </div>
    </div>
  </div>
  )
}
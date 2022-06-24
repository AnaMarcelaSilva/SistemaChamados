import Header from '../../components/Header'
import Title from '../../components/Title'
import './cliente.css'
import {FiSettings} from 'react-icons/fi';



export default function Cliente({children, name}){
  return(
    <div>
      <Header/>
      <div className='Content'>
        <Title name='Cadastro de Cliente'>
          <FiSettings size={25}/>
        </Title>  
      </div>
    </div>
  )
}
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from 'react-router-dom';
//impotando componete de autenticação
import AuthProvider from './contexts/auth';
//Importando rotas
import Routes from './routes';

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
      <ToastContainer autoClose={3000} />
        <Routes/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

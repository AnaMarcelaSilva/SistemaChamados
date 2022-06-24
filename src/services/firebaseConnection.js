import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

let firebaseConfig = {
  apiKey: "AIzaSyAx7ebiZtBt1xXDJOdK8Bw0-CebfEOEboc",
  authDomain: "sigos-eee23.firebaseapp.com",
  projectId: "sigos-eee23",
  storageBucket: "sigos-eee23.appspot.com",
  messagingSenderId: "642858538842",
  appId: "1:642858538842:web:93f12ce04d613f070bc563",
  measurementId: "G-8BW2LDBCEF"
};

//Verificando se já existe uma conexão aberta com firebase caso não, se inicia uma.
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

//Comando para instalar o Firebase no projeto: npm install firebase
import firebase from "firebase/compat/app"
import "firebase/compat/database"

const firebaseConfig = {
    apiKey: "AIzaSyAcNVqFdwWdA6MfpdczI_g021ZxoIIu-Fo",
    authDomain: "quizapp-aa189.firebaseapp.com",
    projectId: "quizapp-aa189",
    storageBucket: "quizapp-aa189.appspot.com",
    messagingSenderId: "181336597187",
    appId: "1:181336597187:web:6db2e322771ae306bc7876"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;
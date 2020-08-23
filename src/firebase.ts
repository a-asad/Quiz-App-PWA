import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAu3g4IMdOm_VA4G3zw5JUxHJV-DYH6ARM",
  authDomain: "quiz-app-pwa.firebaseapp.com",
  databaseURL: "https://quiz-app-pwa.firebaseio.com",
  projectId: "quiz-app-pwa",
  storageBucket: "quiz-app-pwa.appspot.com",
  messagingSenderId: "560667580159",
  appId: "1:560667580159:web:bd30c7d433b1dadb9cdeca"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase;
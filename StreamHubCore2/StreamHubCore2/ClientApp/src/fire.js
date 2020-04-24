import * as firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyA2QVlZ33rvAlDWN_QUL1ZPDCPo55dE1hU",
  authDomain: "stream-hub-70d92.firebaseapp.com",
  databaseURL: "https://stream-hub-70d92.firebaseio.com",
  projectId: "stream-hub-70d92",
  storageBucket: "stream-hub-70d92.appspot.com",
  messagingSenderId: "111109071169",
  appId: "1:111109071169:web:c1461e2a1ab40d0c1781c0"
};
  
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire
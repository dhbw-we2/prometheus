import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyDj_0ODDhDEaJai5T_B-Ht3zZVTYrZVOf8",
  authDomain: "raclettorg.firebaseapp.com",
  databaseURL: "https://raclettorg.firebaseio.com",
  projectId: "raclettorg",
  storageBucket: "raclettorg.appspot.com",
  messagingSenderId: "939228209625",
  appId: "1:939228209625:web:309ecc80dcedf3068679c8"
};

const db = firebase.initializeApp(firebaseConfig).firestore()
export default db

const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

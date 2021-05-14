import firebase from 'firebase'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyCKJaRGBW9_Fjz9KiyCymBS4kbTEx9TSIo",
authDomain: "history-play-70a3c.firebaseapp.com",
projectId: "history-play-70a3c",
storageBucket: "history-play-70a3c.appspot.com",
messagingSenderId: "741381189696",
appId: "1:741381189696:web:146d810032097c0f332fa5",
measurementId: "G-CZLXKC4Q05"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
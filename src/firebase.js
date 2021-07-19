import firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "AIzaSyAT83OcCJj62Pvkt_qSXJtr8nsmQ6LbhwI",
    authDomain: "getfluent-g1.firebaseapp.com",
    databaseURL: "https://getfluent-g1-default-rtdb.firebaseio.com",
    projectId: "getfluent-g1",
    storageBucket: "getfluent-g1.appspot.com",
    messagingSenderId: "282013891603",
    appId: "1:282013891603:web:a114160fd8a7011086d3e6",
    measurementId: "G-0FE3B7JQBN"
};

firebase.initializeApp(config);

export default firebase.database(); 
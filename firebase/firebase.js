import * as firebase from 'firebase';

let config = {
    apiKey: "AIzaSyA47cTVrUWqNoWAayEAerjWenKQwJ5tXIM",
    authDomain: "p2papp-735b8.firebaseapp.com",
    databaseURL: "https://p2papp-735b8.firebaseio.com",
    projectId: "p2papp-735b8",
    storageBucket: "p2papp-735b8.appspot.com",
    messagingSenderId: "301572175822"
};
firebase.initializeApp(config);
export default firebase;
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArfU8f0pHRY2YZeuIYc-M94K45Ux2nqaM",
  authDomain: "cahoots-46db1.firebaseapp.com",
  databaseURL: "https://cahoots-46db1.firebaseio.com",
  storageBucket: "cahoots-46db1.appspot.com",
};

var fb = firebase.initializeApp(firebaseConfig);
export default fb;


// Note: for each file which needs to use the database add: 
// import fb from './firebaseConfig.js'



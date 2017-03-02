import * as firebase from 'firebase';
import React, { Component } from 'react';
import TouchableButton from './touchableButton';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArfU8f0pHRY2YZeuIYc-M94K45Ux2nqaM",
  authDomain: "cahoots-46db1.firebaseapp.com",
  databaseURL: "https://cahoots-46db1.firebaseio.com",
  storageBucket: "cahoots-46db1.appspot.com",
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

export default class EnterGameCode extends Component {
	constructor(props){
		super(props);
		this.state={
			gameId: ''
		}
	}

	pushNewGame(){
		//This function pushes a new Game to the database.
		this.state.gameId = Math.random().toString(36).substr(2, 6); //Generate an alphanumeric 6 digit string
		var gameRef = database.ref().child('Game');

		firebase.database().ref('Game/' + this.state.gameId).set({
			'adminId': 0,
			'numPlayers': 6,
			'theme': 0,
			'players': [0]
		})
	}

	componentWillMount(){
		this.pushNewGame();
	}

  render() {
    return (
      <View style={styling.container}>
        <Text style={styling.welcome}>
          Game ID: {this.state.gameId}
        </Text>
        <TouchableButton style={styling.back} text={"BACK"} onButtonClick={this.onPressBack.bind(this)}/>
      </View>
    );
  }

  onPressBack(){
    console.log("BACK PRESSED")
    this.props.navigator.pop();
  }
}

const styling = StyleSheet.create({
  back: {
    marginTop: 55,
    marginLeft: 5,
    height: 10,
    width: 20
  },
  /*container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },*/
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 100
  },
  /*instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },*/
});

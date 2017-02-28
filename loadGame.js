import * as firebase from 'firebase';
import React, { Component } from 'react';
import TouchableButton from './touchableButton.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	TextInput
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
var gameRef = database.ref().child('Game');

export class GenerateGameCode extends Component{
	constructor(props){
		super(props);
		this.state={
			gameId: ''
		}
	}

	pushNewGame(){
		//This function pushes a new Game to the database.
		this.state.gameId = Math.random().toString(36).substr(2, 6); //Generate an alphanumeric 6 digit string
		//var gameRef = database.ref().child('Game');

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
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Game ID: {this.state.gameId}
        </Text>
      </View>
    );
  }
}

export class EnterGameCode extends Component {
	constructor(props){
		super(props);
		this.state={
			gameId: ''
		}
	}

	pushPlayer(arr, code){
		gameRef.child(code).set({'players': arr});
		this.props.navigator.push({
			id: 'CollectingPlayers'
		})

	}

	connectPlayers(code){
		if(code){
			gameRef.child(code).once('value', snapshot => {
				if(snapshot.val() !== null){
					//We know the game exists so add teh player to the game
					console.log("Game exists");
					var oldArr = snapshot.val().players; //returns an array of players.
					oldArr.push(1);
					this.pushPlayer(oldArr, code);
				}
				else{
					console.log("Error the game doesn't exist");
				}
			})
		}

	}

  render() {
    return (
      <View style={styles.container}>
			<TextInput
		 		style={{height: 40, borderColor: 'gray', borderWidth: 1}}
		 onChangeText={(text) => this.setState({text})}
		 value={this.state.text}
	 />
	 <TouchableButton onButtonClick={()=>this.connectPlayers(this.state.text)} text={"Join game"}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

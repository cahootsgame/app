import * as firebase from 'firebase';
import React, { Component } from 'react';
import ConnectingPlayers from './ConnectingPlayers.js';
import TouchableButton from './touchableButton.js'
import fb from './firebaseConfig.js'

import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
	TextInput
} from 'react-native';

var database = firebase.database();
var gameRef = database.ref().child('Game');
var playersRef = database.ref().child('Players');

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

		var playersEntry = this.state.gameId.concat("-players");
		var playersEntryWithSlash = this.state.gameId.concat("-players/");
		var PlayerPath = 'Players/'.concat(playersEntryWithSlash);

		firebase.database().ref('Game/' + this.state.gameId).set({
			'adminId': 0,
			'numPlayers': 6,
			'theme': 0,
			//'players': [0]
		})
		firebase.database().ref('Players/' + playersEntry).set({
			'gameId': this.state.gameId,
			'totalNumPlayers': 1
		})

		firebase.database().ref(PlayerPath + 0).set({
			'id': 0,
			'ismoderator': 1,
			'status': 'NA',
		})
	}

	componentWillMount(){
		this.pushNewGame();
	}

  onPressBack() {
    console.log("Back pressed in game id screen")
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Tell your friends!</Text>
        <Text style={styles.welcome}>
          Game ID: {this.state.gameId}
        </Text>
        <TouchableButton style={styles.back} text={"BACK"} onButtonClick={this.onPressBack.bind(this)}/>
      </View>

      // IF state.
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

	pushPlayer(code){

		// overwriting entire game, want to just set player field
		//gameRef.child(code).players.push({'players': arr});
		this.props.navigator.push({
			id: 'ConnectingPlayers',
			gameId: code
		})

	}

	connectPlayers(code){

		if(code){
			gameRef.child(code).once('value', snapshot => {
				if(snapshot.val() !== null){

					console.log("Game exists");
					//We know the game exists so add teh player to the game
					var playersEntry = code.concat("-players/");
					var playerPath = 'Players/'.concat(playersEntry);

					firebase.database().ref(playerPath + 1).set({
						'id': 1,
						'ismoderator': 0,
						'status': 'alive',
					})
					//database.ref.child(PlayersEntry).set(totalCurrPlayers + 1)
					this.pushPlayer(code);
				}

				else {
					console.log("Error the game doesn't exist");
					Alert.alert('Invalid Game Code','The game code you have entered does not exist, please try again.',[{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false });
				}
			})
		}

	}

	onPressBack() {
    console.log("Back pressed in enter game code screen")
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Please enter a Game ID:</Text>
		<TextInput style={styles.input}
		 onChangeText={(text) => this.setState({text})}
		 value={this.state.text} />

	 		<TouchableButton style={styles.back} onButtonClick={()=>this.connectPlayers(this.state.text)} text={"JOIN GAME"}/>
	 		<TouchableButton style={styles.back} onButtonClick={this.onPressBack.bind(this)} text={"BACK"}/>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  back: {
    marginTop: 55,
    marginLeft: 5,
    height: 10,
    width: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
    borderRadius: 5,
    marginBottom: 30,
    margin: 38
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
    margin: 100,
    marginTop: 100
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 120,
    marginBottom: 10,
    fontWeight: "100",
  },
  /*instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },*/
});

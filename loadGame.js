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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Game ID: {this.state.gameId}
        </Text>
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
    console.log("Back pressed in choose theme")
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
		<TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
		 onChangeText={(text) => this.setState({text})}
		 value={this.state.text} />

	 		<TouchableButton onButtonClick={()=>this.connectPlayers(this.state.text)} text={"JOIN GAME"}/>
	 		<TouchableButton onButtonClick={this.onPressBack.bind(this)} text={"BACK"}/>
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

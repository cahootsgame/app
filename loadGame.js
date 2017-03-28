import * as firebase from 'firebase';
import React, { Component } from 'react';
import ConnectingPlayers from './ConnectingPlayers.js';
import TouchableButton from './touchableButton.js';
import fb from './firebaseConfig.js'
import ModeratorActions from './moderateScene.js'

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
			gameId: '',
			myId: '',
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
			'numPlayers': 4,
			'theme': 0,
			'cahootVote': 0,
			//'players': [0]
		})
		firebase.database().ref('Players/' + playersEntry).set({
			'gameId': this.state.gameId,
			'totalNumPlayers': 1
		})

		firebase.database().ref(PlayerPath + 0).set({
			'ismoderator': 1,
			'status': -1,
      'charId': -1,
      'charName': 'Moderator'
		})
	}

	componentWillMount(){
		this.pushNewGame();
	}

	onPressModScreen() {
		this.props.navigator.push({
			id: 'ModeratorActions',
			gameId: this.state.gameId,
			playerId: this.state.myId

		})
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

        <TouchableButton  onButtonClick={this.onPressModScreen.bind(this)} text={"START"}/>
      </View>

      // IF state.
    );
  }
}

export class EnterGameCode extends Component {
	constructor(props){
		super(props);
		this.state={
			gameId: '',
      characters4: [{name: "Warlord", assigned: false},
                    {name: "Citizen", assigned: false},
                    {name: "Citizen", assigned: false}],
      characters5: [{name: "Warlord", assigned: false},
                    {name: "Warlord", assigned: false},
                    {name: "Citizen", assigned: false},
                    {name: "Citizen", assigned: false}],
      characters6: [{name: "Warlord", assigned: false},
                    {name: "Warlord", assigned: false},
                    {name: "Citizen", assigned: false},
                    {name: "Citizen", assigned: false},
                    {name: "Citizen", assigned: false}]
		}
	}

	pushConnectingScene(code){
		// overwriting entire game, want to just set player field
		this.props.navigator.push({
			id: 'ConnectingPlayers',
			gameId: code,
      		playerId: this.state.myId,
		})

	}

  assign(numOfPlayers, array, index, code, playerPath, total){
    console.log("initial index is "+index);
    while (array[index].assigned){
      console.log("array[index] is "+array[index]+'and index is '+index);
      if(index === numOfPlayers-2){
        index = 0;
      }
      else {
        index++;
      }
      console.log('index is now '+index);
    }
    firebase.database().ref(playerPath + total).set({
      'ismoderator': 0,
      'status': 1,
      'charId': index,
      'charName': array[index].name
    });
    console.log("the myId state is : " + this.state.myId);
    console.log("the charId state is : " + index);
    console.log("the charName state is : " + array[index].name);
    this.pushConnectingScene(code);
  }

	addPlayerToDatabase(code, totalNum) {
    var self = this;
    var numOfPlayers;
    var array;
		console.log("IN ADD PLAYER")
		var playersEntry = code.concat("-players/");
		var playerPath = 'Players/'.concat(playersEntry);
		gameRef.child(code).once('value', snapshot => {
			if(snapshot.val() !== null){
				console.log("Game exists");
				total = totalNum - 1;
        numOfPlayers = snapshot.val().numPlayers;
        var index = Math.floor(Math.random() * (numOfPlayers-2 - 0)) + 0; //TODO: must change if moderator situation changes, can't be -2 anymore
        if (numOfPlayers === 4){
          array = this.state.characters4;
        }
        else if (numOfPlayers === 5){
          array = this.state.characters5;
        }
        else if (numOfPlayers === 6){
          array = this.state.characters6;
        }
				this.setState({myId: total});
        playersRef.child(playersEntry).once('value').then(function(snapshot){
          var length = Object.keys(snapshot).length;
          var count = 1;
          snapshot.forEach(function(childSnapshot) {
            var charId = childSnapshot.val().charId;
            console.log(charId);
            console.log(array[charId]);
            if(charId !== -1 && charId !== undefined){
              array[charId].assigned = true;
              console.log(array[charId]);
            }
            if(count === length){
              self.assign(numOfPlayers, array, index, code, playerPath, total);
            }
            count++;
          });
          /*console.log("initial index is "+index);
          while (array[index].assigned){
            console.log("array[index] is "+array[index]+'and index is '+index);
            if(index === numOfPlayers-2){
              index = 0;
            }
            else {
              index++;
            }
            console.log('index is now '+index);
          }*/
        });

				/*firebase.database().ref(playerPath + total).set({
					'ismoderator': 0,
					'status': 1,
          'charId': index,
          'charName': array[index].name
				});
				console.log("the myId state is : " + this.state.myId);
				this.pushConnectingScene(code);*/
			}

			else {
				console.log("Error the game doesn't exist");
				Alert.alert('Invalid Game Code','The game code you have entered does not exist, please try again.',[{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false });
			}
		})
	}

	connectPlayers(code){
		console.log("IN CONNECT PLAYERS");
		var playersEntry = code.concat("-players");
		var playerPath = 'Players/'.concat(playersEntry);
		var totalCurrentPlayers;
		playersRef.child(playersEntry).once('value', snapshot => {
			console.log("BEFORE SNAPSHOT NOT = NULL");
       		if (snapshot.val() != null) {
						console.log("Snapshot valu found");
       			totalCurrentPlayers = snapshot.val().totalNumPlayers;
       			totalCurrentPlayers = totalCurrentPlayers + 1;
        		database.ref(playerPath).update({'totalNumPlayers': totalCurrentPlayers});
        		this.addPlayerToDatabase(code,totalCurrentPlayers);
      		}
    	})

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

     <TouchableButton style={styles.back} onButtonClick={this.onPressBack.bind(this)} text={"BACK"}/>
	 		<TouchableButton style={styles.back} onButtonClick={()=>this.connectPlayers(this.state.text)} text={"JOIN GAME"}/>
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

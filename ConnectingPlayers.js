import React, { Component, } from 'react'
import * as firebase from 'firebase';
import Cahoots from './index.ios.js'
import * as Progress from 'react-native-progress';
import TouchableButton from './touchableButton.js'
import fb from './firebaseConfig.js'
//import PlayerCards from './playerCards.js'

import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  Text,
  ProgressViewIOS,
  View
} from 'react-native';

var database = firebase.database();
var gameRef = database.ref().child('Game');
var playersRef = database.ref().child('Players');


type State = { animating: boolean; };
type Timer = number;
export default class ConnectingPlayers extends Component {
  /**
   * Optional Flowtype state and timer types
   */
  state: State;
  _timer: Timer;

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
  }

  componentDidMount() {
    var code = this.props.gameId;
    var playersPath = code.concat("-players");
    this.setToggleTimeout();
    playersRef.child(playersPath).once('value', snapshot => {
      var totalNum = snapshot.val().totalNumPlayers;
			console.log("the total number of playres is " + totalNum);
      if(totalNum !== 4){
        this.waitForPlayers();
      }
      else{
          this.pushCharacterCard();
      }
    });
    //this.waitForPlayers();
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  checkNumberPlayers(code, playersPath) {
    gameRef.child(code).once('value', snapshot => {
      var totalFinalPlayers = snapshot.val().numPlayers;
      console.log('totalFinalPlayers: ' + totalFinalPlayers);
      playersRef.child(playersPath).once('value', snapshot => {
        var totalCurrentPlayers = snapshot.val().totalNumPlayers;
        console.log('totalCurrentPlayers: ' + totalCurrentPlayers)
        if(totalFinalPlayers == totalCurrentPlayers) {
          return true;
        }
        else return false;
      })
    })
  }



  waitForPlayers() {

  var totalCurrentPlayers;
  var totalFinalPlayers;
  var code = this.props.gameId;
  var playerId = this.props.playerId;
  var playersPath = code.concat("-players");
  var check = true;
  playersRef.child(playersPath).on('child_changed', snapshot =>{
    var value = snapshot.val()
    var key = snapshot.key;
    console.log(key);
    console.log(value);
    if((key === 'totalNumPlayers') && (value === 4)){
        this.pushCharacterCard();
    }
    console.log("Added value");
  });


}

  pushCharacterCard() {
    var code = this.props.gameId;
    var playersPath = code.concat("-players/"+this.props.playerId);
    var name;
    playersRef.child(playersPath).once('value', snapshot => {
      name = snapshot.val().charName;
    });
    this.props.navigator.push({
        id: 'PlayerCards',
        role: name,
        status: 1,
        gameId: this.props.gameId,
				playerId: this.props.playerId
    });
    /*var playerRole;
    if(totalPlayers === 4){
      playerRole = characters4[index];
    }
    else if (totalPlayers === 5){
      playerRole = characters5[index];
    }
    else {
      playerRole = characters6[index];
    }
    var code = this.props.gameId;
    var playersPath = code.concat("-players");
    var done = false;
    var charId = null;
    playersRef.child(playersPath).once('value', snapshot => {
      do {
        snapshot.forEach(function(childSnapshot) {
          var charId = childSnapshot.val().charId;

        });
      }
      snapshot.forEach(function(childSnapshot) {
        var charId = childSnapshot.val().charId;
        if
      });
      var totalNum = snapshot.val().totalNumPlayers;
			console.log("the total number of playres is " + totalNum);
      if(totalNum !== 4){
        this.waitForPlayers();
      }
      else{
        this.pushCharacterCard();
      }
    });*/

  }

  /*shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }*/


  setToggleTimeout() {
    this._timer = setTimeout(() => {
      this.setState({animating: !this.state.animating});
      this.setToggleTimeout();
    }, 2000);
  }

    //push(screen for character cards)

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>
        Waiting for players to connect..
      </Text>
        <ActivityIndicator
          style={[styles.centering, {transform: [{scale: 2.5}]}]}
          size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 25,
    fontWeight: "100",
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
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});

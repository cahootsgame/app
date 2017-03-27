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
      characters4: [{name: "Warlord", assigned: false},
                    {name: "Citizen", assigned: false},
                    {name: "Citizen", assigned: false}],
      characters5: [{name: "Warlord", assigned: false},
                    {name: "Warlord", assigned: false},
                    {name: "Citizen", assigned: false},
                    {name: "Citizen", assigned: false}]
      characters6: [{name: "Warlord", assigned: false},
                    {name: "Warlord", assigned: false},
                    {name: "Citizen", assigned: false},
                    {name: "Citizen", assigned: false},
                    {name: "Citizen", assigned: false}]
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
        if(totalNum === 4){
          this.pushCharacterCard(totalNum, characters4);
        }
        else if (totalNum === 5){
          this.pushCharacterCard(totalNum, characters5);
        }
        else if (totalNum === 6){
          this.pushCharacterCard(totalNum, characters6);
        }
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
      if(value === 4){
        this.pushCharacterCard(value, characters4);
      }
      else if (value === 5){
        this.pushCharacterCard(value, characters5);
      }
      else if (value === 6){
        this.pushCharacterCard(value, characters6);
      }
    }
    console.log("Added value");
  });


}

  pushCharacterCard(totalPlayers, array) {
    var index = Math.floor(Math.random() * (value-2 - 0)) + min; //TODO: must change if moderator situation changes, can't be -2 anymore
    var code = this.props.gameId;
    var playersPath = code.concat("-players");
    playersRef.child(playersPath).once('value', snapshot => {
      snapshot.forEach(function(childSnapshot) {
        var charId = childSnapshot.val().charId;
        array[charId].assigned = true;
      });
    });
    while (array[index].assigned){
      index = (index === totalPlayers-1) ? 0 : index++;
    }
    this.props.navigator.push({
        id: 'PlayerCards',
        role: array[index],
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

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
      characters4: ["Warlord", "Citizen", "Citizen"]
    };
  }

  componentDidMount() {
    var code = this.props.gameId;
    var playersPath = code.concat("-players");
    this.setToggleTimeout();
    playersRef.child(playersPath).once('value', snapshot => {
      var totalNum = snapshot.val().totalNumPlayers;
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
  //this.pushCharacterCard();

  /*while (check) {
    // gameRef.child(code).once('value', snapshot => {
    //   if (snapshot.val() !== null) {
    //     totalFinalPlayers = snapshot.val().numPlayers;
    //     console.log(totalFinalPlayers);
    //   }
    // })
    // // Players path is of the form {gamecode}-players
    // playersRef.child(playersPath).once('value', snapshot => {
    //   if (snapshot.val() != null) {
    //     totalCurrentPlayers = snapshot.val().totalNumPlayers;
    //     console.log(totalCurrentPlayers);
    //   }
    // })
    // As soon as all the players are on you can start, push the character cards!
    // console.log(totalCurrentPlayers);
    // console.log(totalFinalPlayers);
    gameRef.child(code).once('value', snapshot => {
      var totalFinalPlayers = snapshot.val().numPlayers;
      console.log('totalFinalPlayers: ' + totalFinalPlayers);
      playersRef.child(playersPath).once('value', snapshot => {
        var totalCurrentPlayers = snapshot.val().totalNumPlayers;
        console.log('totalCurrentPlayers: ' + totalCurrentPlayers)
        if(totalFinalPlayers == totalCurrentPlayers) {
          check = false;
          return;
        }
      })
    })
    // var check = this.checkNumberPlayers(code,playersPath);
    // console.log('check: ' + check);
  }*/

}

  pushCharacterCard() {
    if(this.props.playerId === 1){
      this.props.navigator.push({
        id: 'PlayerCards',
        role: "Warlord",
        status: 1,
        gameId: this.props.gameId+'-players',
      });
    }
    else{
      this.props.navigator.push({
        id: 'PlayerCards',
        role: "Citizen",
        status: 1,
        gameId: this.props.gameId+'-players',
        playerId: this.props.playerId
      });
    }

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

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
    this.setToggleTimeout();
    //this.waitForPlayers();
  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  waitForPlayers() {
  
  var totalCurrentPlayers;
  var totalFinalPlayers;
  var code = this.props.gameId;
  var playersPath = code.concat("-players");
  
  while (true) {
    gameRef.child(code).once('value', snapshot => {
      if (snapshot.val() !== null) {
        totalFinalPlayers = snapshot.val().numPlayers;
        console.log(totalFinalPlayers);
      }
    })
    // Players path is of the form {gamecode}-players
    playersRef.child(playersPath).once('value', snapshot => {
      if (snapshot.val() != null) {
        totalCurrentPlayers = snapshot.val().totalNumPlayers;
        console.log(totalCurrentPlayers);
      }
    })

    // As soon as all the players are on you can start, push the character cards!
    if (totalCurrentPlayers === totalFinalPlayers) {
      break;
    }


  }
}
  //}
  //pushCharacterCard();
  //}   

 /* pushCharacterCard() {
    this.props.navigator.push({
      id: 'PlayerCards'
    })
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
        <ActivityIndicator
          style={[styles.centering, {transform: [{scale: 1.5}]}]}
          size="large" />
        <Text style={styles.welcome}>
          Waiting for players to connect..
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
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



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
    /*while (allplayers.length != snapshot.val("numPlayers")) {
      var allplayers = snapshot.val().players;
    }*/
  // HOW TO GET NUM PLAYERS
  // HOW TO PASS THE GAME CODE FROM PREVIOUS SCREEN
  var allPlayers;
  var totalCurrentPlayers;
  var totalFinalPlayers;

  //TODO: Connect to Rithus Character cards component and try again after sheethala fixes bug
  //while (true) {
    gameRef.child(this.props.gameId).once('value', snapshot => {
        if(snapshot.val() !== null){
          //debugger;
          allPlayers = snapshot.val().players;
          totalCurrentPlayers = allPlayers.length;
          totalFinalPlayers = snapshot.val().numPlayers
          console.log(allPlayers);
          console.log(totalCurrentPlayers);
          console.log(totalFinalPlayers);

        }

    })
    /*if (totalCurrentPlayers === totalFinalPlayers) {
      break;
    }*/
  //}
  //pushCharacterCard();
}   

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


/*export default class ConnectingPlayers extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        //<Progress.Circle size={30} indeterminate={true} />
        <Text style={styles.welcome}>
          Waiting for players to connect
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
});*/
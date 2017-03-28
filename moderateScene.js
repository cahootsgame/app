/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import * as firebase from 'firebase';
import React, { Component } from 'react';
import {EnterGameCode, GenerateGameCode} from './loadGame.js';
import TouchableButton from './touchableButton';
import fb from './firebaseConfig.js';

var database = firebase.database();
var gameRef = database.ref().child('Game');
var playersRef = database.ref().child('Players');

import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

// Can we assign player IDs here?


export default class ModeratorActions extends Component {

  render() {
    return (
      <View>
        <Text style={styles.title}>
         Moderator
        </Text>
        <TouchableButton onButtonClick={this.onPressCahootsVote.bind(this)} text={"Initiate Cahoots Vote"}/>
        <TouchableButton onButtonClick={this.onPressAllVote.bind(this)} text={"Initiate Everyone Vote"}/>
        <TouchableButton onButtonClick={this.onPressBack.bind(this)} text={"BACK"}/>
      </View>
    );
  }

  onPressBack(){
    console.log("Back pressed in choose theme")
    this.props.navigator.pop();
  }

  // PASS CODE AS PROP
  onPressCahootsVote(){
    console.log("CAHOOT VOTE PRESSED");
    var code = this.props.gameId
    var gamePath = 'Game/'.concat(code);
    gameRef.child(code).once('value', snapshot => {
      if(snapshot.val() !== null){
        console.log("Game exists");
        // ACTIVATE VOTE FOR CAHOOTS
        database.ref(gamePath).update({'cahootVote': 1});

      }
    })
  }

  onPressAllVote() {
    var code = this.props.gameId;
    var gamePath = 'Game/'.concat(code);
    gameRef.child(code).once('value', snapshot => {
      if(snapshot.val() !== null) {
        console.log("Game exists");
        // ACTIVATE VOTE FOR all
        database.ref(gamePath).update({'everyoneVote': 1});
      }
    })
  }
}



const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 40,
    fontWeight: "100",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

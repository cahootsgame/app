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
import Swiper from 'react-native-swiper';
import AllPlayerStatus from './allPlayerStatus';
import OpenURLButton from './messengerButton';

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
      <Swiper>
      <View>
        <Text style={styles.title}>
         Moderator
        </Text>
        <TouchableButton onButtonClick={this.onPressCahootsVote.bind(this)} text={"Initiate Cahoots Vote"}/>
        <TouchableButton onButtonClick={this.onPressAllVote.bind(this)} text={"Initiate Everyone Vote"}/>
        <TouchableButton onButtonClick={this.onPressBack.bind(this)} text={"BACK"}/>
        <OpenURLButton url={'fb-messenger-api://app'} />
      </View>
      <View>
        <AllPlayerStatus gameId={this.props.gameId}/>
        <OpenURLButton url={'fb-messenger-api://app'} />
      </View>
      <View>
        <Text style={styles.title}>Prompts</Text>
        <Text style={styles.body}>Soldiers, go to sleep!</Text>
        <Text style={styles.body}>The batallion were sleeping when they heard a noise. They quickly went outside to investigate it. Meanwhile, the one slow soldier was stabbed by an assassin</Text>
        <Text style={styles.body}>There was one outspoken, brave soldier amongst us. Unfortunately the Cahoots did not like that and thus he was hit by an archer!</Text>
      </View>
      </Swiper>
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
    marginTop: 100,
    marginBottom: 40,
    fontWeight: "100",
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  body: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "100",
    margin: 15
  },
  list: {
         flexDirection: 'row',
         flexWrap: 'wrap',
         alignItems: 'flex-start',
         justifyContent: 'center',
     },
     item: {
            backgroundColor: '#68dd90',
            margin: 10,
            width: 150,
            height: 100,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: "400",
            marginTop: 20

        }
});

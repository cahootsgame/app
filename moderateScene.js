/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {EnterGameCode, GenerateGameCode} from './loadGame.js';
import TouchableButton from './touchableButton';

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
      <View style={styles.container}>
        <Text style={styles.welcome}>
         Moderator
        </Text>
        <TouchableButton onButtonClick={this.onPressCahootsVote.bind(this)} text={"Initiate Cahoots Vote"}/>
        <TouchableButton onButtonClick={this.onPressAllVote.bind(this)} text={"Initiate Everyone Vote"}/>
      </View>
    );
  }
  onPressCahootsVote(){
    console.log("CAHOOT VOTE PRESSED")
    // This should add a value to the database to indicate that all cahoots screens should change to vote on who to kill off

    /*this.props.navigator.push({
      id: 'GenerateGameCode'
    })*/

  }

  onPressEveryoneVote() {
    console.log("EVERYONE VOTE PRESSED");
    /*this.props.navigator.push({
      id: 'EnterGameCode'
    })*/
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
});
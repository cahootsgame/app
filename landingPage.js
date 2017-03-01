/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import EnterGameCode from './loadNewGame.js';
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


export default class LandingPage extends Component {

  render() {
    return (
      <View>
        <Text style={styles.welcome}>
         CAHOOTS!
        </Text>
        <TouchableButton  onButtonClick={this.onPressStartNewGame.bind(this)} text={"START"}/>
        <TouchableButton onButtonClick={this.onPressConnectGame.bind(this)} text={"CONNECT TO AN EXISTING GAME"}/>
        <TouchableButton text={"HOW TO PLAY"}/>
      </View>
    );
  }

  onPressStartNewGame(){
    console.log("START NEW GAME PRESSED")
    this.props.navigator.push({
      id: 'EnterGameCode'
    })

  }

  onPressConnectGame() {
    console.log("CONNECT TO GAME PRESSED")
        // This component will be pushed onto the stack
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 160,
    marginBottom: 40,
    fontWeight: "100",
  },
});

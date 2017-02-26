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
      <View style={styles.container}>
        <Text style={styles.welcome}>
         Cahoots!
        </Text>
        <Text>Current Scene: {this.props.title}</Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <TouchableButton onButtonClick={this.onPressStartNewGame.bind(this)} text={"Start new game"}/>
        <TouchableButton onButtonClick={this.onPressConnectGame} text={"Connect to an existing game"}/>
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

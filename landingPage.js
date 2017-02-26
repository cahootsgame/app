/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import gameCode from './loadNewGame.js';
import WelcomeScreen from './welcomeScreen';

import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';


export default class landingPage extends Component {

  render() {
    return (
      <View style={styles.container}>
      <Text>Current Scene: {this.props.title}</Text>
        <Text style={styles.welcome}>
         Cahoots!
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <WelcomeScreen onButtonClick={this.onPressStartNewGame} text={"Start new game"}/>
        <WelcomeScreen onButtonClick={this.onPressConnectGame} text={"Connect to an existing game"}/>
      </View>
    );
  }

  onPressStartNewGame(){
    console.log("START NEW GAME PRESSED")
  }

  onPressConnectGame() {
    console.log("CONNECT TO GAME PRESSED")
        // This component will be pushed onto the stack
        this.props.navigator.push({
      id: 'loadNewGame'
    });
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

AppRegistry.registerComponent('Cahoots', () => Cahoots);
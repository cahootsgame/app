/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import WelcomeScreen from './welcomeScreen';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

//import WelcomeScreen from './welcomeScreen'

export default class Cahoots extends Component {
  onPressLearnMore(){
    console.log("The button is pressed");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         CAHOOTS!
        </Text>
        <WelcomeScreen text={"START NEW GAME"}/>
        <WelcomeScreen text={"CONNECT TO AN EXISTING GAME"}/>
        <WelcomeScreen text={"HOW TO PLAY"}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 70,
    textAlign: 'center',
    marginTop: 160,
    marginBottom: 40,
    fontWeight: "100",
  },
  /*instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },*/
});

AppRegistry.registerComponent('Cahoots', () => Cahoots);

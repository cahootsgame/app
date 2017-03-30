/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {EnterGameCode, GenerateGameCode} from './loadGame.js';
import TouchableButton from './touchableButton';
import NumberOfPlayers from './numberOfPlayers';
import OpenURLButton from './messengerButton';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Linking
} from 'react-native';

// Can we assign player IDs here?


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
        <OpenURLButton url={'fb-messenger://app'} />
      </View>
    );
  }

  onPressStartNewGame(){
    //console.log("START NEW GAME PRESSED")
    this.props.navigator.push({
      id: 'NumberOfPlayers',
			fbID: this.props.fbID,
			name: this.props.name,
			fbProfilePic: this.props.fbProfilePic,
      numOfPlayers: this.props.numOfPlayers
    })

  }

  onPressConnectGame() {
    console.log("CONNECT TO GAME PRESSED");
		this.props.navigator.push({
			id: 'EnterGameCode',
			fbID: this.props.fbID,
			name: this.props.name,
			fbProfilePic: this.props.fbProfilePic
		})
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
	button: {
		color: 'white',
	}
});

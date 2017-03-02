
import React, { Component } from 'react';
import LandingPage from './landingPage'
import {EnterGameCode, GenerateGameCode} from './loadGame.js'
import ConnectingPlayers from './ConnectingPlayers.js';
import NumberOfPlayers from './numberOfPlayers.js'
import ChooseTheme from './chooseTheme.js'
import VotingPage from './votingPage.js'

import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  Button,
  TouchableHighlight
} from 'react-native';

class Cahoots extends Component {

  render() {
    return (

      <Navigator
        initialRoute={{id: 'LandingPage'}}
        renderScene={this.navigatorRenderScene}/>

    );
  }

  navigatorRenderScene(route,navigator){
    console.log("NAVIGATOR RENDER SCENE RUNS")
    _navigator = navigator;
    switch (route.id) {
      case 'LandingPage':
        return (<LandingPage navigator={navigator} title="Start new game or connect"/>);

      case 'EnterGameCode':
        return (<EnterGameCode navigator={navigator} title="Enter new game code"/>);

			case 'GenerateGameCode':
				return(<GenerateGameCode navigator={navigator} title="Enter new game code" />);

			case 'ConnectingPlayers':
				return(<ConnectingPlayers navigator={navigator} title="Wait for players to connect" gameId={route.gameId}/>);

      case 'NumberOfPlayers':
        return (<NumberOfPlayers navigator={navigator} title="Enter the number of players"/>);

      case 'ChooseTheme':
        return (<ChooseTheme navigator={navigator} title="Choose the theme"/>);

      case 'VotingPage':
          return(<VotingPage navigator={navigator} />);
    }
  }
}


AppRegistry.registerComponent('Cahoots', () => Cahoots);

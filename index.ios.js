
import React, { Component } from 'react';
import LandingPage from './landingPage'
import {EnterGameCode, GenerateGameCode} from './loadGame.js'
import ConnectingPlayers from './ConnectingPlayers.js';
import NumberOfPlayers from './numberOfPlayers.js'
import ModeratorActions from './moderateScene.js'
import ChooseTheme from './chooseTheme.js';
import VotingPage from './votingPage.js';
import PlayerCards from './playerCards.js';
import VotingResults from './votingResults.js';
import Login from './login.js';


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
        initialRoute={{id: 'Login'}}
        renderScene={this.navigatorRenderScene}/>

    );
  }

  navigatorRenderScene(route,navigator){
    console.log("NAVIGATOR RENDER SCENE RUNS and route.id is "+route.id)
    _navigator = navigator;
    switch (route.id) {
      case 'Login':
        return (<Login navigator={navigator} title="login"/>);

      case 'LandingPage':
        return (<LandingPage navigator={navigator} title="Start new game or connect" fbID={route.fbID} name={route.name} fbProfilePic={route.fbProfilePic}/>);

      case 'EnterGameCode':
        return (<EnterGameCode navigator={navigator} title="Enter new game code" fbID={route.fbID} name={route.name} fbProfilePic={route.fbProfilePic} />);

			case 'GenerateGameCode':
				return(<GenerateGameCode navigator={navigator} title="Enter new game code" fbID={route.fbID} name={route.name} fbProfilePic={route.fbProfilePic}/>);

			case 'ConnectingPlayers':
				return(<ConnectingPlayers navigator={navigator} title="Wait for players to connect" gameId={route.gameId} playerId={route.playerId}/>);

      case 'NumberOfPlayers':
        return (<NumberOfPlayers navigator={navigator} title="Enter the number of players" fbID={route.fbID} name={route.name} fbProfilePic={route.fbProfilePic}/>);

      case 'ChooseTheme':
        return (<ChooseTheme navigator={navigator} title="Choose the theme" fbID={route.fbID} name={route.name} fbProfilePic={route.fbProfilePic}/>);

      case 'ModeratorActions':
        return(<ModeratorActions navigator={navigator} title="Moderator Screen" gameId={route.gameId} playerId={route.playerId}/>);

      case 'PlayerCards':
        return(<PlayerCards navigator={navigator} title="Wait for players to connect" role={route.role} status={route.status} gameId={route.gameId} playerId={route.playerId}/>);

      case 'VotingPage':
          return(<VotingPage navigator={navigator} gameId={route.gameId} playerId={route.playerId}/>);

      case 'VotingResults':
          return(<VotingResults navigator={navigator} nameWhoGotKilled={route.nameWhoGotKilled}/>);
    }
  }
}


AppRegistry.registerComponent('Cahoots', () => Cahoots);

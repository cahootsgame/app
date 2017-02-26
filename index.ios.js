

import React, { Component } from 'react';
import LandingPage from './landingPage'
import EnterGameCode from './loadNewGame.js'

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
    }
  }
}


AppRegistry.registerComponent('Cahoots', () => Cahoots);
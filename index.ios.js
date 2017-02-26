

import React, { Component } from 'react';
import landingPage from './landingPage'

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
        initialRoute=\{\{id: 'landingPage'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route,navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'landingPage':
        return (<landingPage navigator={navigator} title="Start new game or connect"/>)
      }
    }
  }


AppRegistry.registerComponent('Cahoots', () => Cahoots);
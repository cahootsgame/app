import React, { Component } from 'react';

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
         You have Killed {this.props.nameWhoGotKilled}!
        </Text>
      </View>
    );
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

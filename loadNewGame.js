import * as firebase from 'firebase';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyArfU8f0pHRY2YZeuIYc-M94K45Ux2nqaM",
  authDomain: "cahoots-46db1.firebaseapp.com",
  databaseURL: "https://cahoots-46db1.firebaseio.com",
  storageBucket: "cahoots-46db1.appspot.com",
};

export default class gameCode extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Game ID: {this.props.gamecode}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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


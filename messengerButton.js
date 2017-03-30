/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {EnterGameCode, GenerateGameCode} from './loadGame.js';
import TouchableButton from './touchableButton';
import NumberOfPlayers from './numberOfPlayers';

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

export default class OpenURLButton extends React.Component {
  static propTypes = {
    url: React.PropTypes.string,
  };

  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  };

  render() {
    return (
			<View style={{backgroundColor: '#138dff', marginTop: 126}}>
					<Button
						title={"Open Messenger"}
						onPress={this.handleClick}
						color={'white'} />
		</View>

    );
  }
}

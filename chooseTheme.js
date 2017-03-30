import React, { Component, } from 'react'
import TouchableButton from './touchableButton';
import GenerateGameCode from './loadGame.js';
import NumberOfPlayers from './numberOfPlayers';

import { View, Navigator, Picker, StyleSheet, Text } from 'react-native'

class ChooseTheme extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {warzone: "Warzone", forest: "Forest", aquarium: "Aquarium", village: "Village",
                  government: "Government", none: "No Theme", theme: "Warzone"};
  }

  render() {
    return (
    <View>
    <Text style={styles.title}>Please choose the theme for the game:</Text>
    <Picker
      selectedValue={this.state.theme}
      onValueChange={(themeChosen) => this.setState({theme: themeChosen})}>
      <Picker.Item label="Warzone" value="warzone" />
      <Picker.Item label="Forest" value="forest" />
      <Picker.Item label="Aquarium" value="aquarium" />
      <Picker.Item label="Village" value="village" />
      <Picker.Item label="Government" value="government" />
      <Picker.Item label="No Theme" value="none" />
    </Picker>
    <TouchableButton onButtonClick={this.onPressBack.bind(this)} text={"BACK"}/>
    <TouchableButton onButtonClick={this.onPressNext.bind(this)} text={"NEXT"}/>
    </View>
  );
  }

  onPressNext(){
    console.log("Next pressed in choose theme")
    console.log("NUM PLAYERS IN THEME: " + this.props.numOfPlayers)
    this.props.navigator.push({
      id: 'GenerateGameCode',
			fbID: this.props.fbID,
			name: this.props.name,
			fbProfilePic: this.props.fbProfilePic,
      numOfPlayers: this.props.numOfPlayers
    })
  }

  onPressBack(){
    console.log("Back pressed in choose theme")
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 120,
    marginBottom: 10,
    fontWeight: "100",
  },
});

export default ChooseTheme

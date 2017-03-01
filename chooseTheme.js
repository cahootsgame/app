import React, { Component, } from 'react'
import TouchableButton from './touchableButton';
import EnterGameCode from './loadNewGame.js';
import NumberOfPlayers from './numberOfPlayers';

import { View, Navigator, Picker } from 'react-native'

class ChooseTheme extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {warzone: "Warzone", forest: "Forest", aquarium: "Aquarium", villiage: "Villiage",
                  government: "Government", none: "No Theme", theme: "Warzone"};
  }

  render() {
    return (
    <View>
    <Picker
      selectedValue={this.state.theme}
      onValueChange={(themeChosen) => this.setState({theme: themeChosen})}>
      <Picker.Item label="Warzone" value="warzone" />
      <Picker.Item label="Forest" value="forest" />
      <Picker.Item label="Aquarium" value="aquarium" />
      <Picker.Item label="Villiage" value="villiage" />
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
    this.props.navigator.push({
      id: 'EnterGameCode'
    })
  }

  onPressBack(){
    console.log("Back pressed in choose theme")
    this.props.navigator.pop();
  }
}

export default ChooseTheme

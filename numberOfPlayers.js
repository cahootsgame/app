import React, { Component, } from 'react'
import TouchableButton from './touchableButton';
import ChooseTheme from './chooseTheme';
import { View, Navigator, Picker } from 'react-native'

class NumberOfPlayers extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {four: 4, five: 5, six: 6, numOfPlayers: 4};
  }

  render() {
    return (
    <View>
    <Picker
      selectedValue={this.state.numOfPlayers}
      onValueChange={(num) => {this.setState({numOfPlayers: num});}}>
      <Picker.Item label="4" value="four" />
      <Picker.Item label="5" value="five" />
      <Picker.Item label="6" value="six" />
    </Picker>
    <TouchableButton onButtonClick={this.onPressBack.bind(this)} text={"BACK"}/>
    <TouchableButton onButtonClick={this.onPressNext.bind(this)} text={"NEXT"}/>
    </View>
  );
  }

  onPressNext(){
    console.log("Next pressed in num players")
    this.props.navigator.push({
      id: 'ChooseTheme'
    })
  }

  onPressBack(){
    console.log("Back pressed in num players")
    this.props.navigator.pop();
  }
}

export default NumberOfPlayers

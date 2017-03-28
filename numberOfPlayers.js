import React, { Component, } from 'react'
import TouchableButton from './touchableButton';
import ChooseTheme from './chooseTheme';
import { View, Navigator, Picker, Text, StyleSheet } from 'react-native'

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
    <Text style={styles.title}>Please choose the number of players:</Text>
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
    console.log("NUM OF PLAYERS IN STATE" + this.state.numOfPlayers)
    
    // ADD VALUE AS STATE;
    if (this.state.numOfPlayers === "four") {
      var num_players = 4;
    }
    else if (this.state.numOfPlayers === "five") {
      var num_players = 5;
    }
    else if (this.state.numOfPlayers === "six") {
      var num_players = 6;
    }

    this.props.navigator.push({
      id: 'ChooseTheme',
      numOfPlayers: num_players
    })
  }

  onPressBack(){
    console.log("Back pressed in num players")
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

export default NumberOfPlayers

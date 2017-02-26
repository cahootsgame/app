import React, { Component, } from 'react'
import { View, } from 'react-native'

class PlayerCards extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    //playerNum
    super(props)
    this.state = {characters5: ["Warlord", "Henchman", "Citizen", "Citizen", "Citizen"]}
  }
  
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  render() {
    shuffle(this.state.characters5);
    var shuffledArr = this.state.characters5;
    var role = shuffledArr[this.props.playerNum];
    switch role {
      case 'Citizen':
        return (
          <View>
            <Text>You are a Citizen</Text>
            <Text>You do not have any special powers but keep an eye out for the bad guys so you can exile them.</Text>
          </View>
        );
      case 'Henchman':
        return (
          <View>
            <Text>You are a Henchman</Text>
            <Text>You're one of the bad guys, be discrete so no one can find you.</Text>
          </View>
        );
      case 'Warlord':
        return (
          <View>
            <Text>You are a Warlord</Text>
            <Text>You're one of the bad guys, be discrete so no one can find you.</Text>
          </View>
        );
    }
  }
}

export default PlayerCards
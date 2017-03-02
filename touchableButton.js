import React, { Component, } from 'react'
import Cahoots from './index.ios.js'
import { View,
        Text,
        TouchableHighlight,
        StyleSheet} from 'react-native'

class TouchableButton extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  onClick(){
    this.props.onButtonClick()
  }

  render() {
    return (
     <TouchableHighlight onPress ={this.onClick.bind(this)} underlayColor={'#878a8e'}>
          <View style={styles.container}>
            <Text style={styles.instructions}>
              {this.props.text}
            </Text>
          </View>
        </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    height: 70,
    width: 300,
    marginBottom: 15,
    marginLeft: 37,
    justifyContent: 'center',
    borderRadius: 6,
    paddingTop: 20,
  },
  instructions: {
    flex: 1,
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 20,
    fontWeight: "200",
    textAlign: 'center',
    color: 'white',
  },
});

export default TouchableButton

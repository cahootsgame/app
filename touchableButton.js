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
    marginBottom: 5,
    justifyContent: 'center',
    borderRadius: 6,
    paddingTop: 20,
  },
   /* container1: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 300,
    height: 50,
    backgroundColor: '#007aFF',
    marginBottom: 5
  },*/
  instructions: {
    flex: 1,
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 20,
    fontWeight: "normal",
    textAlign: 'center',
    color: 'white',
  },
});

export default TouchableButton

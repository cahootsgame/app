import React, { Component, } from 'react'
import { View, 
        Text, 
        TouchableHighlight,
        StyleSheet} from 'react-native'

class WelcomeScreen extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }
  
  onPressLearnMore(){
    console.log("This has been pressed");
  }

  render() {
    return (
     <TouchableHighlight onPress ={this.onPressLearnMore} underlayColor={'red'}>
          <View style={styles.container1}>
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
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
    container1: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    width: 300,
    height: 50,
    backgroundColor: '#007aFF',
    marginBottom: 5
  },
  instructions: {
    flex: 1,
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
  },
});

export default WelcomeScreen

import * as firebase from 'firebase';
import React, { Component } from 'react';
import ConnectingPlayers from './ConnectingPlayers.js';
import TouchableButton from './touchableButton.js';
import fb from './firebaseConfig.js'
import ModeratorActions from './moderateScene.js'
import {LoginButton, AccessToken} from 'react-native-fbsdk'
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator
} from 'react-native';

export default class Login extends Component {
	constructor(props){
		super(props);
		this.state={
			gameId: ''
		}
	}


  render() {
    return (
      /*<View style={styles.container}>
      <Text style={styles.title}>Please enter your name:</Text>
		<TextInput style={styles.input}
		 onChangeText={(text) => this.setState({text})}
		 value={this.state.text} />

	 		<TouchableButton style={styles.back} onButtonClick={()=>this.onNextPressed(this)} text={"DONE"}/>
      </View>*/
			<View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );

  }

  onNextPressed(){
    this.props.navigator.push({
			id: 'LandingPage',
		})
  }
}

const styles = StyleSheet.create({
  back: {
    marginTop: 55,
    marginLeft: 5,
    height: 10,
    width: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 300,
    borderRadius: 5,
    marginBottom: 30,
    margin: 38
  },
  /*container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },*/
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 100,
    marginTop: 100
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 120,
    marginBottom: 10,
    fontWeight: "100",
  },
  /*instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },*/
});

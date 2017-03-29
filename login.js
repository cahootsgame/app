
import * as firebase from 'firebase';
import React, { Component } from 'react';
import ConnectingPlayers from './ConnectingPlayers.js';
import TouchableButton from './touchableButton.js';
import fb from './firebaseConfig.js'
import ModeratorActions from './moderateScene.js'
import {LoginButton, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk'
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

	requestFBGraphAPI(data){
		console.log("IN REQUEST THINGY");
		var reqParams = 'email,name,first_name,middle_name,last_name';
		var accessToken = data.accessToken;
		const infoRequest = new GraphRequest(
			'/me',
			{
				parameters: {
					fields: {
						string: reqParams
					},
					access_token: {
						string: accessToken
					}
				}
			},
			this.responseInfoCallback.bind(this)
		);
		new GraphRequestManager().addRequest(infoRequest).start();
	}

	onNextPressed(name, fbID){
		//Get the user id, profile picture.
		var profilePicture = "https://graph.facebook.com/" + fbID + "/picture"
		console.log('calling request FB Graph API');
    this.props.navigator.push({
			id: 'LandingPage',
			fbID: fbID,
			name: name,
			fbProfilePic: profilePicture
		});
  }

	responseInfoCallback(error: ?Object, result: ?Object){
		if(error){
			alert('Error fetching data: ' + error.toString());
	      console.log(Object.keys(error));// print all enumerable
	      console.log(error.errorMessage); // print error message
		}
		else{
			alert('Success fetching data: ' + result.toString());
	      console.log(Object.keys(result));
	      meow_json = JSON.stringify(result); // result => JSON
	      console.log(meow_json); // print JSON
				var name = result['first_name'];
				debugger;
				var fbID = result['id'];
				//Once we have these values Render their screen.
				//this.onNextPressed(name, fbID).bind(this);
				var profilePicture = "https://graph.facebook.com/" + fbID + "/picture"
				console.log('calling request FB Graph API');
		    this.props.navigator.push({
					id: 'LandingPage',
					fbID: fbID,
					name: name,
					fbProfilePic: profilePicture
				});
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
										console.log("FB LOGIN THE DATA IS")
										console.log(data);
                    alert(data.accessToken.toString())
										this.requestFBGraphAPI(data);
;
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );

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

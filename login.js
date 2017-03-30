
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
  Navigator,
	Image
} from 'react-native';

class FBLoginButton extends Component {
	constructor(props){
		super(props);
		this.state={
			gameId: '',
			logged: false,
			name: '',
			pic: ''
		}
	}

  componentWillMount(){
		console.log("IN WILL MOUNT OF FBLOGIN!");
		console.log(AccessToken);
		AccessToken.getCurrentAccessToken().then(
	(data) => {
		if(data) {
			console.log("Already logged in :D")
		 //this.goToHomePage();
		 console.log("Data is ");
		 console.log(data);
		 this.setState({logged: true}, () => {
			 this.requestFBGraphAPI(data).bind(this);
		 });
		}
	 }
		)
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
		var profilePicture = "https://graph.facebook.com/" + fbID + "/picture?type=large"
		console.log('calling request FB Graph API');
    this.props.navigator.push({
			id: 'LandingPage',
			fbID: fbID,
			name: name,
			fbProfilePic: profilePicture
		});
  }

	responseInfoCallback(error: ?Object, result: ?Object){
		console.log("in responseinfocallback");
		if(error){
			console.log("Error")
			alert('Error fetching data: ' + error.toString());
	      console.log(Object.keys(error));// print all enumerable
	      console.log(error.errorMessage); // print error message
		}
		else{
			//alert('Success fetching data: ' + result.toString());
	      console.log(Object.keys(result));
	      meow_json = JSON.stringify(result); // result => JSON
	      console.log(meow_json); // print JSON
				var name = result['first_name'];
				var fbID = result['id'];
				//Once we have these values Render their screen.
				//this.onNextPressed(name, fbID).bind(this);
				var profilePicture = "https://graph.facebook.com/" + fbID + "/picture?type=large"
				console.log('calling request FB Graph API');
				if(this.state.logged){
					console.log("Already logged, setting state")
					this.setState({
						name: name,
						fbID: fbID,
						pic: profilePicture,
					});
				}
				else{
					/*this.props.navigator.push({
						id: 'LandingPage',
						fbID: fbID,
						name: name,
						fbProfilePic: profilePicture
					});*/
					this.setState({
						logged: true,
						name: name,
						fbID: fbID,
						pic: profilePicture
					});
				}
		}
	}

	returnRenderView(obj){
		return(
				<LoginButton
			style={obj}
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
								this.requestFBGraphAPI(data);
							}
						)
					}
				}
			}
			onLogoutFinished={() => {
				this.setState({logged: false})
				alert("logout.")}} />
		)}

returnLoggedRenderView(){
	console.log("IN LOGGEDRENDERVIEW");
	console.log("The name state is ");
	console.log(this.state.name);
	console.log("The fb url pic is ");
	console.log(this.state.pic)
	return(
		<View>
		<Text style={styles.title}>Welcome{"\n"}{this.state.name}</Text>
		<Image source={{uri:this.state.pic}} style={{
    justifyContent: 'center',
    alignItems: 'center',
		alignSelf: 'stretch',
		height: 200,
		width: 200,
		marginLeft: 90,
		marginTop: 30,

	}} />
<View style={styles.logOut}>
	{this.returnRenderView(styles.buttonLogOut)}
</View>
<View>
	<TouchableButton style={styles.back} onButtonClick={()=>this.onNextPressed(this)} text={"CONTINUE"}/>

</View>
		</View>
	)}


returnWhichView(){
	console.log("IN return which view")
	console.log('the state logged is');
	console.log(this.state.logged);
	if(this.state.logged){
		return this.returnLoggedRenderView();
	}
	else{
		return (
			<View>
				<Text style={styles.title}>CAHOOTS{"\n"}{"\n"}Connect with facebook</Text>
				{this.returnRenderView(styles.logIn)}
			</View>
		)
	}
}

  render() {
		console.log("IN render!!!")
    return (
			<View>
				{this.returnWhichView()}
      </View>
    );

  }
}

export default class Login extends Component {
	render() {
    return (
      <View>
        <FBLoginButton navigator={this.props.navigator}/>
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
    marginTop: 80,
    marginBottom: 10,
    fontWeight: "100",
  },

	logOut: {
		marginLeft: 97,
		marginTop: 30,
		marginBottom: 30
	},

  buttonLogOut: {
		height: 30,
		width: 190
	},

	logIn: {
		height: 30,
		width: 200,
		marginTop: 50,
		marginLeft: 90
	},
  /*instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },*/
});

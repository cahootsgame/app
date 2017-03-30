import React, { Component, } from 'react'
import { View, Text, StyleSheet, Alert, ListView } from 'react-native'
import {Grid,Row,Col} from 'react-native-easy-grid'
import fb from './firebaseConfig.js';
import Swiper from 'react-native-swiper'
import AllPlayerStatus from './allPlayerStatus'
import OpenURLButton from './messengerButton';

var database = fb.database();
var playersRef = database.ref().child('Players');
var gameRef = database.ref().child('Game');
class PlayerCards extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
	 this.state = {
		 citizenTitle: "You are a Citizen",
		 citizenBody: "You do not have any special powers but keep an eye out for the bad guys so you can exile them.",
     warlordTitle: "You are a Warlord",
     warlordBody: "You are one of the bad guys, be discrete so no one can find you.",
     status: 1
	 };
  }

  getVotePage(isCahoot,status){
      console.log("START OF GET VOTE PAGE: " + status)
      var constant = status;
      console.log("CONSTANT IS: " + constant)
      //debugger;
      var code = this.props.gameId;
			//var codePlayers =
			console.log("The code is " + this.props.gameId);
      gameRef.child(code).on('child_changed', snapshot => {
        var value = snapshot.val();
        var key = snapshot.key;
				console.log("IN GET VOTE PATE");
        console.log("IN SNAPSHOT STATUS IS: " + status);
        console.log("IN SNAPSHOT CONSTANT IS: " + constant);
        console.log(key);
        console.log(value);
				console.log("The isCahoot is " + isCahoot)
        if((key === 'cahootVote') && (value === 1) && (isCahoot === 1)) {
          // If its time for the cahoots to vote
          if (this.state.status === 1) {
            this.props.navigator.push({
            id: 'VotingPage',
            gameId: code,
            playerId: this.props.playerId
            })
          }
        }
        else if ((key === 'everyoneVote') && (value === 1)) {
          //console.log("IN EVERYONE VOTE ")
          //console.log("STATUS IN EVERYONE VOTE IS: " + status)
          //console.log("CONSTANT IN EVERYONE VOTE IS: " + constant)
          // If its time for everyone to vote
          if (this.state.status === 1) {
            //console.log("IN STATUS === 1");
            //console.log("STATUS IN IF IS: " + status)
            //console.log("CONSTANT IN IF IS: " + constant)
            this.props.navigator.push({
            id: 'VotingPage',
            gameId: code,
            playerId: this.props.playerId
            })
          }
        }
      });
  }

  checkStatus() {
		console.log("The game id in CHECK STATUS IS " + this.props.gameId);
		var code = this.props.gameId+'-players/' + this.props.playerId;
		playersRef.child(code).on('child_changed', snapshot => {
			var key = snapshot.key;
			var value = snapshot.val();
			//console.log("The key in CHECK STATUS IS" + key);
			//console.log("the value in CHECK STATUS IS " + value);
			if((key === 'status') && (value === 0)){
        console.log("SETTING STATE TO 0")
        if(this.props.role === "Citizen"){
          this.setState({citizenTitle: "You were a Citizen.", citizenBody: "Now you are DEAD.", status: 0});
        }
				else if (this.props.role === "Warlord"){
          this.setState({warlordTitle: "You were a Warlord.", warlordBody: "Now you are DEAD.", status: 0});
        }
			}
		});
  }

	listenOnWhoDied(){
    console.log("IN LISTEN ON WHO DIED")
		var code = this.props.gameId
    var path = code.concat("-players");

    playersRef.child(path).on('child_changed', snapshot => {
      if(snapshot.val() !== null) {
        var value = snapshot.val()
        var key = snapshot.key;
        console.log("KEY IS: ")
        console.log(key);
        console.log("VALUE IS: ");
        console.log(value)

        if(key === 'who_died') {
          playersRef.child(path).once('value', snapshot => {
            //Reset total votes back to 0
            var name = snapshot.val().who_died
            console.log("NAME IS: " + name)
            Alert.alert(name + ' HAS DIED', 'Say your goodbyez', [{text: 'OK', onPress: () => console.log('OK Pressed')}], { cancelable: false });
            //Resets cahootVote and everyoneVote back to 0
          });
        }
      }
    });
	}

  componentDidMount() {
    console.log("IN COMPONENT DID MOUNT PLAYER CARDS")
    this.listenOnWhoDied();
		console.log("The props player id is " + this.props.playerId);
    var path = this.props.gameId+'-players/' + this.props.playerId;
    playersRef.child(path).on('value', snapshot => {
      var player = snapshot.val();
      var role = player.charName;
      var playerStatus = player.status;
      console.log("STATUS IN COMPONENT DID MOUNT IS: " + playerStatus)
      var isCahoot;
  		console.log("The role is " + role);
      if (role === "Warlord") {
        isCahoot = 1;
      }
      else {
        isCahoot = 0
      }
      // Render the vote page depending on which vote were doing
      this.getVotePage(isCahoot,playerStatus);
      // Check if i've died
      this.checkStatus();
    });
  }

  render() {
    switch (this.props.role) {
        case 'Citizen':
          return (
						<Swiper>
							<View>
	              <Text style={styles.title}>{this.state.citizenTitle}</Text>
	              <Text style={styles.body}>{this.state.citizenBody}</Text>
                <OpenURLButton url={'fb-messenger-api://app'} />
	            </View>
        			<View>
								<AllPlayerStatus gameId={this.props.gameId}/>
                <OpenURLButton url={'fb-messenger-api://app'} />
        			</View>
						</Swiper>

          );
        /*case 'Henchman':
          return (
            <View>
              <Text>You are a Henchman</Text>
              <Text>You are one of the bad guys, be discrete so no one can find you.</Text>
            </View>
          );*/
        case 'Warlord':
          return (
            <Swiper>
            <View>
              <Text style={styles.title}>{this.state.warlordTitle}</Text>
              <Text style={styles.body}>{this.state.warlordBody}</Text>
							<OpenURLButton url={'fb-messenger-api://app'} />
            </View>
            <View>
              <AllPlayerStatus gameId={this.props.gameId}/>
							<OpenURLButton url={'fb-messenger-api://app'} />
            </View>
            </Swiper>
          );
      }
    }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 200,
    marginBottom: 10,
    fontWeight: "100",
  },
  body: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "100",
    margin: 15
  },
	container: {
	 alignItems:'center',
	 justifyContent:'center'
 },
 list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
				alignItems: 'flex-start',
				justifyContent: 'center',
    },
		item: {
	         backgroundColor: '#68dd90',
	         margin: 10,
	         width: 150,
					 height: 100,
           fontSize: 20,
           textAlign: 'center',
           fontWeight: "400",
           marginTop: 20

	     }
});

export default PlayerCards

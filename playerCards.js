import React, { Component, } from 'react'
import { View, Text, StyleSheet, ListView } from 'react-native'
import {Grid,Row,Col} from 'react-native-easy-grid'
import fb from './firebaseConfig.js';
import Swiper from 'react-native-swiper'
import AllPlayerStatus from './allPlayerStatus'

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
		 citizenBody: "You do not have any special powers but keep an eye out for the bad guys so you can exile them."
	 };
  }

  getVotePate(){
      var code = this.props.gameId;
			//var codePlayers =
			console.log("The code is " + this.props.gameId);
      gameRef.child(code).on('child_changed', snapshot =>{
        var value = snapshot.val();
        var key = snapshot.key;
				console.log("IN GETVOTEPATE");
        console.log(key);
        console.log(value);
        if((key === 'cahootVote') && (value === 1)){
            this.props.navigator.push({
            id: 'VotingPage',
            gameId: code
          })
        }
      });
  }

  checkStatus(){
		console.log("The game id in CHECK STATUS IS " + this.props.gameId);
		var code = this.props.gameId+'-players/2';
		playersRef.child(code).on('child_changed', snapshot =>{
			var key = snapshot.key;
			var value = snapshot.val();
			console.log("The key in CHECK STATUS IS" + key);
			console.log("the value in CHECK STATUS IS " + value);
			if((key === 'status') && (value === 0)){
				this.setState({citizenTitle: "You were a Citizen.", citizenBody: "Now you are DEAD."});
			}
		});
  }

	getPlayerStatus(){
		//This function gets the player status, and renders them.

	}

  componentDidMount(){
		console.log("The props player id is " + this.props.playerId);
    if(this.props.playerId == 2){
      this.checkStatus();
    }
    if(this.props.playerId == 1) {
      this.getVotePate();
    }
  }

  render() {
    switch (this.props.role) {
        case 'Citizen':
          return (
						<Swiper>
							<View>
	              <Text style={styles.title}>{this.state.citizenTitle}</Text>
	              <Text style={styles.body}>{this.state.citizenBody}</Text>
	            </View>
        			<View>
								<AllPlayerStatus gameId={this.props.gameId}/>
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
              <Text style={styles.title}>You are a Warlord</Text>
              <Text style={styles.body}>You are one of the bad guys, be discrete so no one can find you.</Text>
            </View>
            <View>
              <AllPlayerStatus gameId={this.props.gameId}/>
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
	         backgroundColor: 'blue',
	         margin: 3,
	         width: 150,
					 height: 100

	     }
});

export default PlayerCards

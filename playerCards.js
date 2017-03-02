import React, { Component, } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import fb from './firebaseConfig.js';

var database = fb.database();
var playersRef = database.ref().child('Players');
var gameRef = database.ref().child('Game');

class PlayerCards extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {citizenTitle: "You are a Citizen", citizenBody: "You do not have any special powers but keep an eye out for the bad guys so you can exile them."}
  }

  getVotePate(){
      var code = this.props.gameId;
      gameRef.child(code).on('child_changed', snapshot =>{
        var value = snapshot.val();
        var key = snapshot.key;
        console.log(key);
        console.log(value);
        if((key === 'cahootVote') && (value === 1)){
            this.props.navigator.push({
            id: 'VotingPage',
            gameId: codePlayers,
          })
        }
      });

    /*if (this.props.playerId === 1) {
      var code = this.props.gameId
      var gamePath = 'Game/'.concat(code);
      var ret;
      var codePlayers;
      while (true) {
        gameRef.child(code).once('value', snapshot => {
          if(snapshot.val() !== null) {
            // Moderator clicked the button for voting
            ret = snapshot.val().cahootVote;
            codePlayers = code.concat('-players')
            if (ret === 1) {
              this.props.navigator.push({
                id: 'VotingPage',
                gameId: codePlayers,
              })
            }
          }
        })
      }
    }*/
  }

  checkStatus(){
    while(true){
      var status;
      playersRef.child(this.props.gameId+"/2").once('value', snapshot => {
        if (snapshot.val() != null) {
          status = snapshot.val().status;
          console.log(status);
        }
        if(status === 0){
          this.setState({citizenTitle: "You were a Citizen.", citizenBody: "Now you are DEAD."});
        }
      })
    }
  }

  componentDidMount(){
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
            <View>
              <Text style={styles.title}>{this.state.citizenTitle}</Text>
              <Text style={styles.body}>{this.state.citizenBody}</Text>
            </View>
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
            <View>
              <Text style={styles.title}>You are a Warlord</Text>
              <Text style={styles.body}>You are one of the bad guys, be discrete so no one can find you.</Text>
            </View>
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
  }
});

export default PlayerCards

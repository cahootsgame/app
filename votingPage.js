import React, { Component } from 'react';
import TouchableButton from './touchableButton.js';
import * as firebase from 'firebase';
import fb from './firebaseConfig.js'


var database = firebase.database();
var gameRef = database.ref().child('Game');
var playersRef = database.ref().child('Players');

import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  Button,
  TouchableHighlight,
  ListView,
  Image,
  Row,
  Dimensions
} from 'react-native';

export default class VotingPage extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'Duaa', 'Sheethala'
      ]),
      numPeopleVoting: 0,
      cahootVote: 0,
      everyoneVote: 0,
      nameOfKilled: ''
    }
  }

  componentDidMount(){

    this.numVoting();
    this.setVoteInfo();
    this.listenOnVotes();

  }

  listenOnVotes() {
    var code = this.props.gameId
    var path = code.concat("-players");
    
    console.log("NAME IS: ")
    playersRef.child(path).on('child_changed', snapshot => { 
          if(snapshot.val() !== null) {
            var value = snapshot.val()
            var key = snapshot.key;

            console.log("IN LISTEN ON VOTES, PRINTING KEY" + key)
            console.log("PRINTING VALUE" + value);
            console.log("IN LISTENER, NUM PEOPLE VOTING: " + this.state.numPeopleVoting)
            if((key === 'total_vote') && (value === this.state.numPeopleVoting)) {
              playersRef.child(path).once('value', snapshot => {
              console.log("IN IF")
              //Reset total votes back to 0
              var name = snapshot.val().who_died
              console.log("NAME IS: " + name)
              database.ref('Players/' + path).update({'total_vote': 0});
              //Resets cahootVote and everyoneVote back to 0
              this.resetVote();
              this.props.navigator.push({
                id: 'VotingResults',
                nameWhoGotKilled: name
              })
            });
          }
      }
    });         
  }

getAllPlayers(){
   //This function gets all players in the game.

   var code = this.props.gameId+'-players';
   playersRef.child(code).once("value")
    .then(function(snapshot) {
      console.log("BEFORE HE FOR LOOOOOOÔP!!!!!!!!!!!!!!!!")
      console.log("The snapshot value is");
      console.log(snapshot.val());
      //var playerArr = [];
      var playerArr = [];
      var key = snapshot.key
      console.log("The key is" + key);
      console.log("The ")
      //snapshot.val() is an object. We know the number of keys, thus iterate through it
      var totalPlayers = snapshot.val().totalNumPlayers;
      for(var i = 0; i<totalPlayers; i++) {

        //player is an object which represents player i.
        console.log("The snapshot value is");
        console.log(snapshot.val());
        var player = snapshot.val()[i];

        console.log("the i is" + i);
        console.log("THE PLAYER IS");
        console.log(player);
        if(typeof(player) === 'undefined'){
          console.log("PLAYER UNDEFINED HELP!!!!!!!!!!!!!")
          continue;
        }
        //@TODO : To remove this hardcoded thing
        //player['name'] = 'player' + i;
        if (player.ismoderator !== 1 && this.state.cahootVote === 1 && player.charName === "Citizen") {

            playerArr.push(player);
            console.log("The player is arr");
            console.log(playerArr);
        }
        if (player.ismoderator !== 1 && this.state.everyoneVote === 1) {
            playerArr.push(player);
            console.log("The player is arr");
            console.log(playerArr);
        }
      }
      console.log("DONE THE FOR LOOP");
      console.log(playerArr);
      this.setState({
      dataSource: this.state.dataSource.cloneWithRows(playerArr)
      });
    }.bind(this));
    //return playerArr;
 }


  setVoteInfo() {
    var code = this.props.gameId
    var gamePath = 'Game/'.concat(code);
    gameRef.child(code).once('value', snapshot => {
      if(snapshot.val() !== null){
        console.log("Game exists");
        // ACTIVATE VOTE FOR CAHOOTS
        var cahoot = snapshot.val().cahootVote;
        var everyone = snapshot.val().everyoneVote;
        this.setState({'cahootVote': cahoot, 'everyoneVote': everyone}, () => {
            this.getAllPlayers(); 
        });
      }
    });

  }

  numVoting() {

    var code = this.props.gameId
    console.log("CODE: " + code)
    var path = code.concat("-players");
    console.log("IN NUMVOTING");
    playersRef.child(path).once('value', snapshot => {
      console.log("NUMVOTING BEFORE snapshot is: " + snapshot.val())
      if(snapshot.val() !== null){
        console.log("IN SNAPSHOT VAL FOR NUM VOTING");
        var numberPeopleVoting = snapshot.val().totalNumVoters;
        console.log("NUM PEOPLE VOTE BEING SET TO: " + numberPeopleVoting)
        this.setState({numPeopleVoting: numberPeopleVoting});
      }
    })
  }

  // PlayerID is the facebook ID of that person that was clicked on to vote off
  addVote(code, playerID) {
      console.log("CALLED WHEN VOTE IS MADE");
      var playersEntry = code.concat("-players");
      var playerPath = 'Players/'.concat(playersEntry);
      var totalCurrentPlayers;

    playersRef.child(playersEntry).once('value', snapshot => {
      console.log("BEFORE SNAPSHOT NOT = NULL");
        if(snapshot.val() !== null){
          // The number of players that are still left in the game
           totalCurrentPlayers = snapshot.val().totalNumPlayers;
            var numVotes;
            // TODO: here should we check if the player is dead or not?? Shouldnt ever reach here if the player is dead tbh, cus the button wouldnt have rendered
            for(var i = 0; i < totalCurrentPlayers; i++){
              var player = snapshot.val()[i];
              if(player.facebookID === playerID){
                //Someone wanted to kill this player, add 1 to their vote.
                
                numVotes = player.numvotes + 1;
                console.log("NUMVOTES IS NOW: " + numVotes)
                var currentPlayerPath = playerPath + '/' + i;
                database.ref(currentPlayerPath).update({'numvotes': numVotes});
              }
            }

            // Check against this value to see if everyones votes are in 
            totalVotes = snapshot.val().total_vote;
            totalVotes = totalVotes + 1;
            if (totalVotes !== this.state.numPeopleVoting) {
              database.ref(playerPath).update({'total_vote': totalVotes});
            }
            console.log ("BEFORE TOTALVOTES -- NUM PEOPLE VOTING")
            console.log("totalVotes is: " + totalVotes)
            console.log("this.state.numPeopleVoting: " + this.state.numPeopleVoting)
            if (totalVotes === this.state.numPeopleVoting) {
                  console.log ("IN TOTAL VOTES == NUM PEOPLE VOTING")
                  this.calculateResult(totalVotes);
            }

          }
      })
  }

  calculateResult(totalVote) {
    // This funtion will change the dead/alive thingy
    console.log("IN CALCULATE RESULT");
    var code = this.props.gameId
    var path = code.concat("-players");
    playersRef.child(path).once('value', snapshot => {

      if(snapshot.val() !== null) {
        totalCurrentPlayers = snapshot.val().totalNumPlayers;
        var numVotes;
        var currHighest = 0;
        var curr = 0;
        var playerToKill;
        var k;
        // iterate through all the players
        for(i = 0; i < totalCurrentPlayers; i++){
          var player = snapshot.val()[i];
          curr = player.numvotes;
          console.log("NUMBER OF VOTES FOR: " + i)
          if (curr > currHighest) {
            currHighest = curr;
            playerToKill = player;
            k = i;
          }
          // RESET their count
          var currentPlayerPath = 'Players/' + path + '/' + i;
          console.log("CURRENT PLAYER PATH: " + currentPlayerPath)
            database.ref(currentPlayerPath).update({'numvotes': 0});
          }
          // actually change their status to 0, their dead
          this.completeVote(k,playerToKill,totalVote);
      }
    })
}

  resetVote() {
    var code = this.props.gameId
    var gamePath = 'Game/'.concat(code);
    gameRef.child(code).once('value', snapshot => {
      if(snapshot.val() !== null){
        console.log("Game exists");
        // ACTIVATE VOTE FOR CAHOOTS
        database.ref(gamePath).update({'cahootVote': 0});
        database.ref(gamePath).update({'everyoneVote': 0});
      }
    })
  }


  completeVote(k,playerToKill,totalVotes) {
      var code = this.props.gameId;
      var playersEntry = code.concat("-players");
      var playerPath = 'Players/'.concat(playersEntry);
      var name = playerToKill.name;
			firebase.database().ref(playerPath + '/' + k).update({'status': 0}, () => {
        this.setState({nameOfKilled: name});
        database.ref(playerPath).update({'total_vote': totalVotes, 'who_died': name});
      });
      //this.resetVote();
    }


    whichVote(code, whoToKill) {

      //Check from the Database if it was cahoot vote or everyone vote
      //If everyoneVote, call addToVote, else call complete voe with two params.
      var k;

      var totalCurrentPlayers;
      if (this.state.everyoneVote === 1) {
        this.addVote(code,whoToKill);
      } else if (this.state.cahootVote === 1) {
        playersRef.child(playersEntry).once('value', snapshot => {
        console.log("BEFORE SNAPSHOT NOT = NULL");
          if(snapshot.val() !== null) {
             totalCurrentPlayers = snapshot.val().totalNumPlayers;
              var numVotes;
              for(var i = 0; i<totalCurrentPlayers; i++){
                var player = snapshot.val()[i];
                if(player.facebookID === playerID){
                  //Someone wanted to kill this player, add 1 to their vote.
                  this.completeVote(i,player);
                }
              }
            }
        })
      }
    }

  renderRow(item) {
    console.log("IN RENDER ROW")
    console.log(item);
    var whoToKill = item.facebookID
      return (
        <TouchableHighlight onPress={() => this.whichVote(this.props.gameId, whoToKill)}underlayColor='rgba(0,0,0,0)'>
           <View style={styles.row}>
           <Image style ={styles.thumb} />
             <Text style={styles.text}>
               {item.name}
             </Text>
           </View>
         </TouchableHighlight>

      );
  }



  render() {
    console.log("NUM PEOPLE VOTING IS: " + this.state.numPeopleVoting);
    console.log("CAHOOT VOTE: " + this.state.cahootVote);
    console.log("EVERYONE VOTE: " + this.state.everyoneVote);
    return(
        <ListView contentContainerStyle = {styles.list}
          dataSource = {this.state.dataSource}
          renderRow={(item) => this.renderRow(item)}
        />
    )
  }
}

var THUMB_URLS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];


var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};


var styles = StyleSheet.create({
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 8,
    width: 74,
    height: 70,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 80,
    height: 14
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});

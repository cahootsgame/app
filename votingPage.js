import React, { Component } from 'react';
import TouchableButton from './touchableButton.js';
import * as firebase from 'firebase';
import fb from './firebaseConfig.js'




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
      data: ds.cloneWithRows([
        'Duaa', 'Sheethala'
      ]),
      numPeopleVoting: 0,
      cahootVote: 0,
      everyoneVote: 0
    }
  }

  componentDidMount(){
    this.setVoteInfo();
    this.numVoting(this.state.gameId);
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
        this.setState({'cahootVote': cahoot});
        this.setState({'everyoneVote': everyone});
      }
    })

  }

  numVoting(code) {
    playerRef.child(code).once('value', snapshot => {
      if(snapshot.val() !== null){
        console.log("Game exists");
        var numberPeopleVoting = snapshot.val().totalNumVoters;

        this.setState({numPeopleVoting: numberPeopleVoting});
      }
    })
  }

  addVote(code, playerID) {
      console.log("CALLED WHEN VOTE IS MADE");
      var playersEntry = code.concat("-players");
      var playerPath = 'Players/'.concat(playersEntry);
      var totalCurrentPlayers;

    playersRef.child(playersEntry).once('value', snapshot => {
      console.log("BEFORE SNAPSHOT NOT = NULL");
        if(snapshot.val() !== NULL){
           totalCurrentPlayers = snapshot.val().totalNumPlayers;
            var numVotes;
            for(var i = 0; i<totalCurrentPlayers; i++){
              var player = snapshot.val()[i];
              if(player.facebookID === playerID){
                //Someone wanted to kill this player, add 1 to their vote.
                numVotes = player.numVotes + 1;
                var currentPlayerPath = playerPath + '/' + i;
                database.ref(currentPlayerPath).update({'numvotes': numVotes});
              }
            }
            totalVotes = snapshot.val().total_vote;
            totalVotes = totalVotes + 1;
            database.ref(playerPath).update({'total_vote': totalVotes});

            if (totalVotes === this.state.numPeopleVoting) {
                  this.calculateResult();
            }
          }
      })
  }

  calculateResult() {
    // This funtion will change the dead/alive thingy
    playersRef.child(playersEntry).once('value', snapshot => {

      if(snapshot.val() !== NULL) {
        totalCurrentPlayers = snapshot.val().totalNumPlayers;
        var numVotes;
        var currHighest = 0;
        var curr = 0;
        var playerToKill;
        var k;
        for(i = 0; i < totalCurrentPlayers; i++){
          var player = snapshot.val()[i];
          curr = player.numVotes;
          if (curr > currHighest) {
            currHighest = curr;
            playerToKill = player;
            k = i;
          }
          var currentPlayerPath = playerPath + '/' + i;
            database.ref(currentPlayerPath).update({'numvotes': 0});
          }
          this.completeVote(k,playerToKill);
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

  //_pressData({}: {[key: number]: boolean})

/*_genRows(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (X)' : '';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;
  }*/

    /*_pressRow(rowID) {
      this.state._pressData[rowID] = !this.state._pressData[rowID];
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this.state._pressData)
      )});
    }*/

    completeVote(k,playerToKill) {
      var name = playerToKill.name;
			firebase.database().ref('Players/' + this.props.gameId  + '-players/' + k).update({
				'status': 0
			});
      this.props.navigator.push({
        id: 'VotingResults',
        nameWhoGotKilled: name
      })

      resetVote();

    }


    whichVote(code, whoToKill) {

      //Check from the Database if it was cahoot vote or everyone vote
      //If everyoneVote, call addToVote, else call complete voe with two params.
      var k;

      var totalCurrentPlayers;
      if (this.state.everyoneVote === 1) {
        addVote(code,whoToKill);
      } else if (this.state.cahootVote === 1) {
        playersRef.child(playersEntry).once('value', snapshot => {
        console.log("BEFORE SNAPSHOT NOT = NULL");
          if(snapshot.val() !== NULL) {
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
      var rowHash = Math.abs(hashCode(rowData));
      var imgSource = {
        uri: THUMB_URLS[rowHash % THUMB_URLS.length],
      };
      var whoToKill = item.facebookID
      return (
        <TouchableHighlight onPress={() => this.whichVote(this.props.gameId, whoToKill)}underlayColor='rgba(0,0,0,0)'>
           <View style={styles.row}>
           <Image style ={styles.thumb} source={imgSource} />
             <Text style={styles.text}>
               {rowData}
             </Text>
           </View>
         </TouchableHighlight>

      );
    }



  render() {
    return(
        <ListView contentContainerStyle = {styles.list}
          dataSource = {this.state.data}
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

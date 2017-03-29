import React, { Component, } from 'react'
import { View, Text, StyleSheet, ListView } from 'react-native'
import {Grid,Row,Col} from 'react-native-easy-grid'
import fb from './firebaseConfig.js';
import Swiper from 'react-native-swiper'


var database = fb.database();
var playersRef = database.ref().child('Players');
var gameRef = database.ref().child('Game');

class AllPlayerStatus extends Component {

  static propTypes = {}

  static defaultProps = {}


  constructor(props) {
    super(props)
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	 this.state = {
		 dataSource: ds.cloneWithRows([1]),
		 citizenTitle: "You are a Citizen",
		 citizenBody: "You do not have any special powers but keep an eye out for the bad guys so you can exile them."
	 };
	 console.log("Setting state the data is ");
	 //console.log(data);
  }

	componentDidMount(){
		console.log("IN component did mount");
		this.getAllPlayers();
		this.checkStatus();
	}

	shouldComponentUpdate(){
		console.log("In should updatte!");
		return true;
	}

 getAllPlayers(){
	 //This function gets all players in the game.
	 var code = this.props.gameId+'-players';
	 playersRef.child(code).once("value")
	 	.then(function(snapshot) {
			//var playerArr = [];
			var playerArr = [];
			var key = snapshot.key
			console.log("The key is" + key);
			//snapshot.val() is an object. We know the number of keys, thus iterate through it
			var totalPlayers = snapshot.val().totalNumPlayers;
			for(var i = 0; i<totalPlayers; i++){
				console.log("total num players " +totalPlayers);

				//player is an object which represents player i.
				var player = snapshot.val()[i];
				//@TODO : To remove this hardcoded thing
				//player['name'] = 'player' + i;
				
				playerArr.push(player);
				console.log("The player is arr");
				console.log(playerArr);
			}
			console.log("DONE THE FOR LOOP");
			console.log(playerArr);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(playerArr)
			});
		}.bind(this));
		//return playerArr
 }

 checkStatus(){
	console.log("in check status");
	var code = this.props.gameId+'-players';
	playersRef.child(code).on('child_changed', snapshot =>{
		console.log("CHANGE OCCURED");
		var key = snapshot.key;
		var value = snapshot.val();
		//console.log("The key in CHECK STATUS IS" + key);
		//console.log("the value in CHECK STATUS IS " + value);
		//console.log(value);
			this.getAllPlayers();
	});
 }

copyArray(arr, value){
	console.log("IN COPY ARR")
	var copyArr = []
	for(var i = 0; i<arr.length; i++){
		var obj = arr[i]
		copyArr.push(obj)
	}
	copyArr[2]['status'] = 0;
	this.setState({
		dataSource: this.state.dataSource.cloneWithRows([{name: 'player1', status: 0}])
	});
}

renderRow(data){
	console.log("Tde data is!!!!")
	console.log(data);
	//debugger;
	var status = data.status;
	status = typeof(data.status) === 'undefined' ? 1 : data.status;
	console.log('thestatus is' + status + ' type : ' + typeof(status))
	switch(status){
		case 1:
		return(
			<Text style={styles.alive}>
				{data.name}
			</Text>
		);

		case 0:
		return(
			<Text style={styles.dead}>
				{data.name}
			</Text>
		);

		default:
		return(
			<Text style={styles.alive}>
			{data.name}
			</Text>
		)
	}

}

  render() {
					//this.getAllPlayers();
					console.log("IN RENDER");
					console.log(this.state.dataSource);
          return (
        			<ListView
							contentContainerStyle={styles.list}
           		dataSource={this.state.dataSource}
           		renderRow={(rowData) => this.renderRow(rowData)}
         />
			 );
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
	alive: {
	         backgroundColor: 'blue',
	         margin: 3,
	         width: 150,
					 height: 100

	     },
	dead: {
		backgroundColor: 'red',
		margin: 3,
		width: 150,
		height: 100
	}
});

export default AllPlayerStatus

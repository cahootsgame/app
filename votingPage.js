import React, { Component } from 'react';
import TouchableButton from './touchableButton.js';




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
      //data: ds.cloneWithRows(this._genRows({}))
      data: ds.cloneWithRows([
        'Duaa', 'Rithu', 'Saif', 'Sheethal'
      ])
    }
  }

  //_pressData({}: {[key: number]: boolean})

  _genRows(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (X)' : '';
      dataBlob.push('Cell ' + ii + pressedText);
    }
    return dataBlob;
  }

    _pressRow(rowID) {
      this.state._pressData[rowID] = !this.state._pressData[rowID];
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this._genRows(this.state._pressData)
      )});
    }

    completeVote(){
      console.log('yo');
      this.props.navigator.push({
        id: 'VotingResults'
      })
    }

    _renderRow(rowData: string, sectionID: number, rowID: number) {
      var rowHash = Math.abs(hashCode(rowData));
      var imgSource = {
        uri: THUMB_URLS[rowHash % THUMB_URLS.length],
      };
      return (
        <TouchableHighlight onPress={() => this.completeVote()}underlayColor='rgba(0,0,0,0)'>
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
          renderRow={(item) => this._renderRow(item)}
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

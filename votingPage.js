import React, { Component } from 'react';





import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Text,
  View,
  Button,
  TouchableHighlight,
  ListView
} from 'react-native';

export default class VotingPage extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      data: ds.cloneWithRows(this._genRows({}))
    }
  }

  _genRows(pressData: {[key: number]: boolean}): Array<string> {
  var dataBlob = [];
  for (var ii = 0; ii < 100; ii++) {
    var pressedText = pressData[ii] ? ' (X)' : '';
    dataBlob.push('Cell ' + ii + pressedText);
  }
  return dataBlob;
}

_pressRow(rowID: number) {
  this._pressData[rowID] = !this._pressData[rowID];
  this.setState({dataSource: this.state.dataSource.cloneWithRows(
    this._genRows(this._pressData)
  )});
}

_renderRow(rowData: string, sectionID: number, rowID: number) {
  var rowHash = Math.abs(hashCode(rowData));
  // var imgSource = {
  //   uri: THUMB_URLS[rowHash % THUMB_URLS.length],
  // };
  return (
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowData}
          </Text>
        </View>
  );
}



  render() {
    return(
      <ListView contentContainerStyle = {styles.list}
        dataSource = {this.state.data}
        renderRow={this._renderRow}
      />
    )
  }
}

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
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  thumb: {
    width: 64,
    height: 64
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});

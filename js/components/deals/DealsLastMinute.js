import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View, Image, AsyncStorage, ListView, TouchableHighlight, Text, Dimensions} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Spinner } from 'native-base';
import { replaceRoute } from '../../actions/route';
import {Video} from 'react-native-media-kit';
import Config from '../../Config';

import styles from './styles';

class DealsLastMinute extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
      };
  }
  replaceRoute(route) {
      this.props.replaceRoute(route);
  }
  rowPressed(propertyGuid) {
	  console.log('Press!');
	}
  componentWillMount() {
    fetch(Config.API_URL + '/adventure/lastminute?token={'+global.token+'}', {
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           method: "GET"
      })
      .then((response) => {
        if (response.status >= 300)
        {
            Alert.alert('Error', JSON.stringify(response));

            return null;
        }
          
        return response.json();
      })
      .then((responseData) => {
          console.log("responseData: " + JSON.stringify(responseData));

          if (!responseData)
            return;

          this._handleResponse(responseData.lastminutes);
      })
      .done();
  }

	_handleResponse(response) {
    console.log(response);
    let rowData = [];
    let role;
    if(global.world_type === 1)
      role = 1;
    else {
      role = 2;
    }

    for (var i = 0; i < response.length; i++) {
      console.log(response[i].site_id);
      if(response[i].site_id == role) {
        rowData.push(response[i]);
      }
    }


    this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rowData)
    });

	}

  renderRow(rowData, sectionID, rowID) {
    /*let adventureMedia;
    console.log('AdventureMedia===',rowData.movie);
    console.log('AdventurePicture===', rowData.thumbnail);
    if (rowData.movie === "" ) {
        adventureMedia = (
            <Image style={styles.adventure_area}
                    resizeMode={Image.resizeMode.stretch}
                    source={rowData.thumbnail}/>
        )
    } else {
        adventureMedia = (
            <Video
                style={styles.adventure_area}
                autoplay={true}
                preload='none'
                controls={true}
                loop={true}
                muted={false}
                src={rowData.movie}
            />
        )
    }*/
    return (
      <TouchableHighlight onPress={() => this.rowPressed(rowData.guid)}
	        underlayColor='#dddddd' style ={{height: 220}}>
          <Image style={styles.thumb} source={{ uri: rowData.thumbnail }}>
              <View style={{flex:7}}/>
      	      <View style={{flex:3, flexDirection:'row', backgroundColor:'grey',opacity: 0.9}}>
        	          <View  style={styles.textContainer}>
          	            <Text style={styles.title}>{rowData.name}</Text>
          	            <Text style={styles.description}>{rowData.description}</Text>
        	          </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>Total:</Text>
                        <Text style={styles.price}>{rowData.currency}{rowData.price}</Text>
                    </View>
        	        <View style={styles.separator}/>
      	      </View>
          </Image>
	    </TouchableHighlight>
    );
	}
  render() {
    return (
      <View style={{flex:1,}}>
          <ListView
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}


function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(DealsLastMinute);

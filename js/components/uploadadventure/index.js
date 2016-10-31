import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View, Image, AsyncStorage, Text, ListView, TouchableOpacity,Alert } from 'react-native';
import { Container, Header, Title, Content, Button, List, ListItem, InputGroup, Input } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import { replaceOrPushRoute } from '../../actions/route';
import { replaceRoute } from '../../actions/route';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import Config from '../../Config';
import { Video } from 'react-native-media-kit';
import Spinner from 'react-native-loading-spinner-overlay';

import NetworkImage from 'react-native-image-progress';
import Progress from 'react-native-progress';

class UploadAdventure extends Component {
  constructor(props) {
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        isfocused: true,
        spinnerVisible : true
      };
  }

  replaceRoute(route) {
      this.props.replaceRoute(route);
  }

  replaceOrPushRoute(route) {
      //this.props.replaceOrPushRoute(route);
      if(global.skiplogin === 1)
        Alert.alert('GolfSkiWorld','You are not logged in. You need to login to upload your adventures',[
          {text: 'Login', onPress: () => this.props.replaceRoute('login')},
          {text: 'Cancel', onPress: () => console.log('Pressed Cancel')},
        ]);

      else
        this.props.replaceRoute(route);
  }

  componentWillMount() {
      this._executeQuery();
  }
  rowPressed(propertyGuid) {
	    console.log('Press!');
	}

  _executeQuery() {
    console.log(Config.API_URL + '/adventure/destinations/' + global.world_type);

    fetch(Config.API_URL + '/adventure/destinations/' + global.world_type, {
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

          this.setState({spinnerVisible: false});
 
          if (!responseData)
            return;

          this._handleResponse(responseData.destinations);
      })
      .done();
	}
  _handleResponse(response) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(response)
    });
	}

  renderRow(rowData, sectionID, rowID) {

    console.log("rowData: " + JSON.stringify(rowData) + "\n\n");

    if(rowData.movie) 
      return (
        <View style={{backgroundColor:'#DDD', marginBottom: 20, marginTop: 10, borderRadius:5}}>
          <View style={styles.liadventure_area}>
            <View style={styles.liadventure_area}>
              <Video
              style={{flex:1}}
              autoplay={true}
              preload='none'
              controls={true}
              muted={true}
              loop={true}
              src={rowData.movie}/>
            </View>
          </View>
        <View style={{flexDirection:'column', marginTop:5, marginBottom:5}}>
          <Grid style={{flex:1}}>
            <Col style={{flex:1}}/>
            <Col style={{flex:5,flexDirection:'row'}}>
              <TouchableOpacity>
                <Icon name='film' style={{fontSize:23}}/>
              </TouchableOpacity>
              <Text style={{fontSize:20, marginLeft:5}}>{rowData.created_at}</Text>
              <TouchableOpacity>
                <Icon name='share-alt'style={{fontSize:23}}/>
              </TouchableOpacity>
            </Col>
            <Col style={{flex:18}}>
            </Col>
          </Grid>
        </View>
        <View style={styles.li_text_area}>
          <Text style={styles.lititle}>{rowData.name}</Text>
          <Text style={styles.Description}>{rowData.description}</Text>
        </View>
      </View>
      );
    else if(rowData.thumbnail) 
      return (
      <View style={{backgroundColor:'#DDD', marginBottom: 20, marginTop: 10, borderRadius:5}}>
          <View style={styles.liadventure_area}>
            <Image style={styles.liadventure_area} resizeMode={Image.resizeMode.cover} source={{ uri: rowData.thumbnail }} />
          </View>
          <View style={{flexDirection:'column', marginTop:5, marginBottom:5}}>
          <Grid style={{flex:1}}>
            <Col style={{flex:1}}/>
            <Col style={{flex:5,flexDirection:'row'}}>
              <TouchableOpacity>
                <Icon name='image' style={{fontSize:23}}/>
              </TouchableOpacity>
              <Text style={{fontSize:20, marginLeft:5}}>{rowData.created_at}</Text>
              <TouchableOpacity>
                <Icon name='share-alt'style={{fontSize:23}}/>
              </TouchableOpacity>
            </Col>
            <Col style={{flex:18}}>
            </Col>
          </Grid>
        </View>
        <View style={styles.li_text_area}>
          <Text style={styles.lititle}>{rowData.name}</Text>
          <Text style={styles.Description}>{rowData.description}</Text>
        </View>
      </View>
      );
    else
    return (
      <View style={{backgroundColor:'#DDD', marginBottom: 20, marginTop: 10, borderRadius:5}}>
          <View style={styles.liadventure_area}>
            <Image style={styles.liadventure_area}/>
          </View>
        <View style={{flexDirection:'column', marginTop:5, marginBottom:5}}>
          <Grid style={{flex:1}}>
            <Col style={{flex:1}}/>
            <Col style={{flex:5,flexDirection:'row'}}>
              <TouchableOpacity>
                <Icon name='rocket' style={{fontSize:23}}/>
              </TouchableOpacity>
              <Text style={{fontSize:20, marginLeft:5}}>{rowData.created_at}</Text>
              <TouchableOpacity>
                <Icon name='share-alt'style={{fontSize:23}}/>
              </TouchableOpacity>
            </Col>
            <Col style={{flex:18}}>
            </Col>
          </Grid>
        </View>
        <View style={styles.li_text_area}>
          <Text style={styles.lititle}>{rowData.name}</Text>
          <Text style={styles.Description}>{rowData.description}</Text>
        </View>
      </View>
    );
	}
  
  render() {
    return (
      <View style={styles.container}>
        <Spinner visible={this.state.spinnerVisible} />
        <ListView
          style={{flex:1}}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}/>
        <ActionButton buttonColor="#1abc9c" onPress={() => this.replaceOrPushRoute('edituploadinfo')}>
        </ActionButton>
      </View>
    );
  }
}

function bindAction(dispatch) {
    return {
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(UploadAdventure);

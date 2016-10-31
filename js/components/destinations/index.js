import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View, ScrollView, Alert, Image, AsyncStorage, ListView, TouchableHighlight, Text, Dimensions} from 'react-native';
import { Spinner } from 'native-base';
import MapView from 'react-native-maps';

import { replaceRoute } from '../../actions/route';

var styles = require('./styles');

import Config from '../../Config';

var CustomCallout = require('./CustomCallout');

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Destinations extends Component {

    constructor(props) {
        super(props);

        this.state = {
          markers: [],
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    componentWillMount() {
      let roleAPI;


      if(global.world_type === 1) {

        roleAPI = '/adventure/golf';

        console.log('destinations: ' + Config.API_URL + roleAPI);

        fetch(Config.API_URL + roleAPI, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              method: "GET"
          })
          .then((response) => response.json())
          .then((responseData) => {

              this.handleResponse(responseData.resorts)
          })
          .done();
      } else {
        roleAPI = '/adventure/ski?token='+global.TOKEN;

        console.log('destinations: ' + Config.API_URL + roleAPI);

        fetch(Config.API_URL + roleAPI, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              method: "GET"
          })
          .then((response) => response.json())
          .then((responseData) => {

              this.handleResponse(responseData.resorts)
          })
          .done();
      }
    }

    handleResponse(response) {
      console.log('response: ' + JSON.stringify(response));

      this.setState({
      markers: response,
      });
    }

    render() {
        return (
      <View style={styles.container}>
        <MapView

          style={styles.map}

          loadingEnabled={true}
          loadingIndicatorColor={"#666666"}
          loadingBackgroundColor={"#eeeeee"}>
          {
            this.state.markers.map((marker) => {
              console.log('Marker: '+marker.id);
              if(global.world_type === 1) {
                  return (
                      <MapView.Marker
                        key={marker.id}
                        coordinate={{latitude:marker.latitude, longitude: marker.longitude}}
                        image={require('../../../images/marker/m_golf.png')}
                        >
                        {<MapView.Callout style={styles.MyCallout}>
                          <CustomCallout marker={marker}>
                            <Text>Resort Name: {marker.name}</Text>
                            <Text>Address: {marker.street}</Text>
                            <Text>Zip: {marker.zip}</Text>
                            <Text>Phone: {marker.phone}</Text>
                            <Text>Email: {marker.email}</Text>
                          </CustomCallout>
                        </MapView.Callout>}
                      </MapView.Marker>
                  );
              }else {
                  return (
                    <MapView.Marker
                      key={marker.id}
                      coordinate={{latitude:marker.latitude, longitude: marker.longitude}}
                      image={require('../../../images/marker/m_golf.png')}
                      >
                      {<MapView.Callout style={styles.MyCallout}>
                        <CustomCallout marker={marker}>
                          <Text>Resort Name: {marker.name}</Text>
                          <Text>Address: {marker.street}</Text>
                          <Text>Zip: {marker.zip}</Text>
                          <Text>Phone: {marker.phone}</Text>
                          <Text>Email: {marker.email}</Text>
                        </CustomCallout>
                      </MapView.Callout>}
                    </MapView.Marker>
                  );
              }
            })
          }
        </MapView>
      </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}
export default connect(null, bindAction)(Destinations);

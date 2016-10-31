'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} = ReactNative;

import { connect } from 'react-redux';

import { Container, Header, Footer, Title, Button, Icon, Grid, Row } from 'native-base';

import { popRoute } from '../../actions/route';
import { globalNav } from '../../AppNavigator';
var MapView = require('react-native-maps');
import styles from './styles';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const ASPECT_RATIO = width / height;
const LATITUDE = 48;
const LONGITUDE = 21;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

var ChoosePosition = React.createClass({
    getInitialState() {
        return {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
        };
    },

    onRegionChange(region) {
        this.setState({ region });
    },

    popRoute() {
        this.props.navigator.replace({
            id: 'edituploadinfo',
            passProps: {
                choosen_latitude: this.state.region.latitude,
                choosen_longitude: this.state.region.longitude,
                imageUriView : this.props.imageUriView,
                imageUri : this.props.imageUri,
                videoUri : this.props.videoUri,
                mediaType : this.props.mediaType,
                title : this.props.title,
                description : this.props.description}
        });
    },

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref="map"
                    mapType="hybrid"
                    style={styles.map}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    onRegionChange={this.onRegionChange}>
                </MapView>

                <View style={[styles.bubble, styles.latlng]}>
                    <Text style={{ textAlign: 'center'}}>
                        {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}`}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.back}
                    onPress={() => this.popRoute()}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30 }}>&larr;</Text>
                </TouchableOpacity>
            </View>
        );
    },
});

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(ChoosePosition);

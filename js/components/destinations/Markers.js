import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View, Image, AsyncStorage, ListView, TouchableHighlight, Text, Dimensions} from 'react-native';
import { Spinner } from 'native-base';
import MapView from 'react-native-maps';

import { replaceRoute } from '../../actions/route';
import Config from '../../Config';

//import styles from './styles';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

class Markers extends Component {

    constructor(props) {
        super(props);

        this.state = { markers: [], region: { latitude: 59, longitude: 18, latitudeDelta: 0, longitudeDelta: 0 }  };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    componentWillMount() {
        let roleAPI = '/adventure/ski';

        if (global.world_type === 1) {
            roleAPI = '/adventure/golf';
        }

        console.log(Config.API_URL + roleAPI);

        fetch(Config.API_URL + roleAPI, {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            method: "GET"
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log("responseData: " + JSON.stringify(responseData));

            this._handleResponse(responseData.resorts)
        })
        .done();
    }

	_handleResponse(response) {
        console.log("response.length: " + response.length);

        let markers = [];
        let role = global.world_type;

        for (var i = 0; i < response.length; i++) {
            console.log("response[" + i + "]: " + JSON.stringify(response[i]));

            if (response[i].type_id == role) {
                let marker = {
                    latitude: response[i].latitude,
                    longitude: response[i].longitude,
                    title: response[i].name,
                    subtitle: response[i].description,
                    1
                };

                console.log("marker: " + JSON.stringify(marker));

                markers.push(marker);
            }
        }

        this.setState({
            markers: markers
        });
	}

    render() {
        return (
            <View style={styles.container}>
                <MapView

                    style={styles.map}

                    onPress={this.onMapPress}
                    loadingEnabled={true}
                    loadingIndicatorColor={"#666666"}
                    loadingBackgroundColor={"#eeeeee"}
                    //initialRegion={this.state.region}
                    initialRegion={{
                        latitude: 59,
                        longitude: 18,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    annotations={this.state.markers}
                    />
            </View>
        );
    }
}

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default Markers;

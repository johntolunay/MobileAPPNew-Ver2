import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { replaceRoute } from '../../actions/route';
import styles from "./styles";
import { globalNav } from '../../AppNavigator';
import { Dashboard } from '../dashboard/'
import { Video } from 'react-native-media-kit';

import Roundabout from '../roundabout';

var devWid = Dimensions.get('window').width;
var devHei = Dimensions.get('window').height;

function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Welcome);

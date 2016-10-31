
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';
import FacebookTabBar from '../facebooktabbar';
import Settings from '../settings';
import Login from '../login';

import MainGolf from '../maingolf';
import MainSki from '../mainski';
import UserProfile_golf from '../userprofile_golf';
import UserProfile_ski from '../userprofile_ski';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import theme from '../../themes/base-theme';
import styles from './styles';
/*

<Button transparent onPress={this.props.openDrawer}>
    <Icon name="ios-menu" />
</Button>
<Button transparent onPress={() => this.replaceRoute('login')}>
    <Icon name="ios-power" />
</Button>


*/
class Dashboard extends Component {

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }
    render() {
        if(global.world_type == 1) {
          return (
            <MainGolf />
          )
        } else if(global.world_type == 2) {
          return (
            <MainSki />
          )
        }else if(global.world_type == 3){
          return (
            <UserProfile_golf />
          )
        }else if(global.world_type == 4){
          return (
            <UserProfile_ski />
          )
        }
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Dashboard);

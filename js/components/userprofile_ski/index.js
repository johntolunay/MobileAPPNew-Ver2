
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert, Thumbnail } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';
import FacebookTabBar from '../facebooktabbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import UploadAdventure from '../uploadadventure';
import Destinations from '../destinations';
import Deals from '../deals';
import Settings from '../settings';

import theme from '../../themes/base-theme';
import styles from './styles';

class UserProfile_ski extends Component {
    constructor(props) {
        super(props);
        console.log('World Type: ' + global.world_type);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    handleTabChange(obj) {
      if(obj.i == 3)
         this.replaceRoute('welcome');
    }
    /*
    <Row style={{flex:2, flexDirection:'column', backgroundColor:'#228B22'}}>
            <View style={{flex:3}} />
            <View style={{flex:6}}>
              <Text style={{color:'white', fontSize:22, textAlign:'center'}}>Golf World</Text>
            </View>
            <View style={{flex:1}} />
          </Row>
    */
    render() {
      return (
        <Grid>
          <Header style={{backgroundColor: '#4169E1'}} foregroundColor="#fff">
              <Title>Ski Profile</Title>
              <Button transparent onPress={this.props.openDrawer}>
                    <Icon name="ios-menu" />
              </Button>
          </Header>
          <Row style={{flex:26}}>
            <ScrollableTabView
              initialPage={0}
              tabBarPosition='bottom'
              renderTabBar={() => <FacebookTabBar style={{backgroundColor:'#4169E1'}} />}>

              <ScrollView tabLabel="ios-color-filter" >
              </ScrollView>
            </ScrollableTabView>
          </Row>
        </Grid>
      )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(UserProfile_ski);

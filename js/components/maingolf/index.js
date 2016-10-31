
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

import Config from '../../Config';

import UploadAdventure from '../uploadadventure';
import Destinations from '../destinations';
import Deals from '../deals';
import Roundabout from '../roundabout';

import theme from '../../themes/base-theme';
import styles from './styles';

class MainGolf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'featured'
        };
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    handleTabChange(obj) {
      if(obj.i == 4)
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
          <Header style={{backgroundColor: '#228B22'}} foregroundColor="#fff">
              <Title>Golf World</Title>
              <Button transparent onPress={this.props.openDrawer}>
                    <Icon name="ios-menu" />
              </Button>
              <Button transparent onPress={() => this.replaceRoute('userprofile-golf')} >
                  <Thumbnail square size={35} source={require('../../../images/profile_ph.png')} />
              </Button>
          </Header>
          <Row style={{flex:26}}>
            <ScrollableTabView
              onChangeTab={(obj) => this.handleTabChange(obj)}
              initialPage={0}
              tabBarPosition='bottom'
              renderTabBar={() => <FacebookTabBar style={{backgroundColor:'#228B22'}} />}>
              <UploadAdventure tabLabel="ios-home" />
              <Destinations tabLabel="ios-pin" />
              <Deals tabLabel="ios-ribbon" />
              <Roundabout tabLabel="ios-image" />
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

export default connect(null, bindAction)(MainGolf);

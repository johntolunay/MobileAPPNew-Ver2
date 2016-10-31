
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Content, Text, List, ListItem, Icon, Thumbnail } from 'native-base';
import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute } from '../../actions/route';
import Config from '../../Config';
import styles from "./style";
class SideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
          name: global.NAME
        }
    }
    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }


    render() {

        if(global.skiplogin == 1) {
          return (
            <Content style={styles.sidebar} >
                <List foregroundColor={"white"}>

                    <ListItem iconLeft onPress={() => this.navigateTo('dashboard')} >
                        <Icon name="ios-laptop-outline" />
                        <Text>Dashboard</Text>
                    </ListItem>
                    <ListItem iconLeft onPress={() => this.navigateTo('login')} >
                        <Icon name="ios-log-out-outline" />
                        <Text> Log In</Text>
                    </ListItem>
                </List>
            </Content>
          )
        }
        else
        return (
          <Content style={styles.sidebar} >
              <List foregroundColor={"white"}>

                  <ListItem onPress={() => this.navigateTo('userprofile-golf')} >
                      <Thumbnail square size={35} source={require('../../../images/profile_ph.png')} />
                      <Text>{this.state.NAME}</Text>
                      <Text note>Your Profile</Text>
                  </ListItem>
                  <ListItem iconLeft onPress={() => this.navigateTo('dashboard')} >
                      <Icon name="ios-laptop-outline" />
                      <Text>Dashboard</Text>
                  </ListItem>
                  <ListItem iconLeft onPress={() => this.navigateTo('logout')} >
                      <Icon name="ios-log-out-outline" />
                      <Text> Log Out</Text>
                  </ListItem>
              </List>
          </Content>
        )


    }


}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SideBar);

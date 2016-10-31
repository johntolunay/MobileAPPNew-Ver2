
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Title, Footer, Content, Button, Icon, Alert, Thumbnail , List, ListItem} from 'native-base';
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
import ProfileTheme from '../../themes/profile-theme';
import styles from './styles';

import Config from '../../Config';

import Prompt from 'react-native-prompt';

class UserProfile_golf extends Component {
    constructor(props) {
        super(props);
        this.state = {

          name: global.NAME,
          country: global.COUNTRY,
          city: global.CITY,
          address: global.ADDRESS,
          mobile: global.MOBILE,
          phone: global.PHONE,
          userpic: global.USERPIC,
          firstnamePromptVisible: false,
          countryPromptVisible: false,
          cityPromptVisible: false,
          addressPromptVisisble: false,
          mobilePromptVisible: false,
          phonePromptVisislbe: false,
          changePicturePromptVisible: false
        }
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
          <Header style={{backgroundColor: '#228B22'}} foregroundColor="#fff">
              <Title>Golf Profile</Title>
              <Button transparent onPress={this.props.openDrawer}>
                    <Icon name="ios-menu" />
              </Button>
          </Header>
          <Row style={{flex:26}}>
            <ScrollableTabView
              initialPage={0}
              tabBarPosition='bottom'
              renderTabBar={() => <FacebookTabBar style={{backgroundColor:'#228B22'}} />}>

              <ScrollView tabLabel="ios-color-filter" >
              <Content theme={ProfileTheme}>
              <ListItem iconRight onPress={() => this.setState({
                changePicturePromptVisible: true
              })}>
                <Text>                          <Thumbnail square size={160} source={require('../../../images/profile_ph.png')} /></Text>
                </ListItem>
                  <List foregroundColor={"white"}>
                      <ListItem iconRight onPress={() => this.setState({
                        firstnamePromptVisible: true
                      })}>
                      <Icon name="ios-menu"/>
                          <Text>{this.state.name}</Text>
                      </ListItem>
                      <ListItem iconRight onPress={() => this.setState({
                        countryPromptVisible: true
                      })}>
                          <Icon name="ios-menu"/>
                          <Text>{this.state.country}</Text>
                      </ListItem>
                      <ListItem iconRight onPress={() => this.setState({
                        cityPromptVisible: true
                      })}>
                          <Icon name="ios-menu"/>
                          <Text>{this.state.city}</Text>
                      </ListItem>
                      <ListItem iconRight onPress={() => this.setState({
                        addressPromptVisisble: true
                      })}>
                          <Icon name="ios-menu"/>
                          <Text>{this.state.address}</Text>
                      </ListItem>
                      <ListItem iconRight onPress={() => this.setState({
                        mobilePromptVisible: true
                      })}>
                          <Icon name="ios-menu"/>
                          <Text>{this.state.mobile}</Text>
                      </ListItem>
                      <ListItem iconRight onPress={() => this.setState({
                        phonePromptVisislbe: true
                      })}>
                          <Icon name="ios-menu"/>
                          <Text>{this.state.phone}</Text>
                      </ListItem>
                  </List>

              </Content>
              </ScrollView>

              <Settings tabLabel="ios-settings-outline" />
            </ScrollableTabView>
          </Row>
          <Prompt title="Change Firstname" placeholder="firstname" defaultValue={this.state.name} visible={this.state.firstnamePromptVisible}
                onCancel={() => this.setState({
                  firstnamePromptVisible: false,
                  message: 'Canceled setting change.'
                })
              }
                onSubmit={(value) =>
                  this.setState({
                    firstname: value,
                    firstnamePromptVisible: false
                  })


            } />
              <Prompt title="Change Country" placeholder="country" defaultValue={this.state.country} visible={this.state.countryPromptVisible}
                    onCancel={() => this.setState({
                      countryPromptVisible: false,
                      message: 'Canceled setting change'
                    })
                  }
                    onSubmit={(value) =>
                      this.setState({
                        country: value,
                        countryPromptVisible: false
                      })


                } />
                <Prompt title="Change City" placeholder="city" defaultValue={this.state.city} visible={this.state.cityPromptVisible}
                      onCancel={() => this.setState({
                        cityPromptVisible: false,
                        message: 'Canceled setting change'
                      })
                    }
                      onSubmit={(value) =>
                        this.setState({
                          city: value,
                          cityPromptVisible: false
                        })


                  } />
                  <Prompt title="Change Address" placeholder="address" defaultValue={this.state.address} visible={this.state.addressPromptVisisble}
                        onCancel={() => this.setState({
                          addressPromptVisisble: false,
                          message: 'Canceled setting change'
                        })
                      }
                        onSubmit={(value) =>
                          this.setState({
                            address: value,
                            addressPromptVisisble: false
                          })


                    } />
                    <Prompt title="Change Mobile Number" placeholder="mobile" defaultValue={this.state.mobile} visible={this.state.mobilePromptVisible}
                          onCancel={() => this.setState({
                            mobilePromptVisible: false,
                            message: 'Canceled setting change'
                          })
                        }
                          onSubmit={(value) =>
                            this.setState({
                              mobile: value,
                              mobilePromptVisible: false
                            })


                      } />
                      <Prompt title="Change Phone Number" placeholder="phone" defaultValue={this.state.phone} visible={this.state.phonePromptVisislbe}
                            onCancel={() => this.setState({
                              phone: false,
                              message: 'Canceled setting change'
                            })
                          }
                            onSubmit={(value) =>
                              this.setState({
                                phone: value,
                                phonePromptVisislbe: false
                              })


                        } />

        </Grid>

      )
    }
}

const profstyles = StyleSheet.create({
  profpic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(UserProfile_golf);

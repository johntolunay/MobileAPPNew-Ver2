
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';

import Config from '../../Config';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visibleHeight: Dimensions.get('window').height,
            scroll: false,
            user: null,
            firstname: null,
            lastname: null
        };
    }

    componentDidMount() {
    }

    replaceRoute(route) {
      global.skiplogin = 0;
      this.props.replaceRoute(route);
    }

    replaceRouteSkip(){
      global.skiplogin = 1;
      this.props.replaceRoute('welcome');
    }

    validateEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    loginWithFacebook(){
      console.log('Logging in with Facebook');
    }

    loginWithGoogle(){
      console.log('Logging in with Google');
    }

    loginWithEmail() {
      var _this = this;
      if (!this.validateEmail(this.state.email) || !this.state.password) {
        Alert.alert('Invalid Credentials','Please input valid email address and password.');
      } else {
        if(this.state.password.length >= 6) {
          console.log('login: '+Config.API_URL + '/auth/login?email='+_this.state.email+'&password='+_this.state.password);
          
          fetch(Config.API_URL + '/auth/login?email='+_this.state.email+'&password='+_this.state.password, {
            method: 'POST'
          })
          .then((response) => response.json())
          .then((responseData) => {
              if(responseData.status_code == 422){
                Alert.alert('Login Failed',responseData.errors[0][0]);
              } else if(responseData.status_code == 401) {
                Alert.alert('Login Failed','Sorry, Invalid email address and password.');
              }
              else{
                console.log('Login Data: '+JSON.stringify(responseData));

                AsyncStorage.setItem("LOGIN_TYPE", 'EMAIL_LOGIN');
                AsyncStorage.setItem("TOKEN", responseData.token);
                AsyncStorage.setItem("EMAIL", _this.state.email);
                AsyncStorage.setItem("PASSWORD", _this.state.password);
                AsyncStorage.setItem("USERID", responseData.user.id + '');

                global.LOGIN_TYPE = 'EMAIL_LOGIN';
                global.TOKEN = responseData.token;
                global.EMAIL = _this.state.email;
                global.PASSWORD = _this.state.password;
                global.USERID = responseData.user.id + '';

                this.replaceRoute('dashboard');
              }
          })
          .done();

        }
      }
    }

    render() {
      var _this=this;
      return (
        <Image style={{flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={require('../../../images/splash.png')}>
          <Grid>
            <Col style={{ flex: 10 }} />
            <Col style={{ flex: 80 }}>
              <Row style={{ flex: 30 }} />
              <Row style={{ flex: 8 }}>
                <Image style={{ flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={require('../../../images/logo.png') } />
              </Row>
              <Row style={{ flex: 3 }} />
              <Row style={{ flex: 40 }}>
                <Image style={{ flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={ require('../../../images/login_overlay.png') }>
                  <Grid>
                    <Col style={{ flex: 5 }} />
                    <Col style={{ flex: 90 }}>
                      <Row style={{ flex: 2 }} />
                      <Row style={{ flex: 15 }}>
                          <InputGroup style={{flex: 1, width: null}}>
                              <Icon name="ios-at" />
                              <Input
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                                controlled={true}
                                keyboardType="email-address"
                                placeholder="EMAIL"
                                placeholderTextColor="#555555" />
                          </InputGroup>
                      </Row>
                      <Row style={{ flex: 15 }}>
                          <InputGroup style={{flex: 1, width: null}}>
                              <Icon name="ios-key" />
                              <Input
                                onChangeText={(text) => this.setState({ password: text })}
                                value={this.state.password}
                                controlled={true}
                                placeholder="PASSWORD"
                                placeholderTextColor="#555555"
                                secureTextEntry={true}/>
                          </InputGroup>
                      </Row>
                      <Row style={{ flex: 5 }} />
                      <Row style={{ flex: 15 }}>
                          <Button block small success style={{flex: 1, width: null}} onPress={this.loginWithEmail.bind(this)}>
                            <Text style={{fontWeight: 'bold', color: 'white'}}>LOG IN</Text>
                          </Button>
                      </Row>

                      <Row style={{ flex: 5, justifyContent: 'center' }}>
                          <Text style={{fontWeight: 'bold', color: '#555555'}}> OR </Text>
                      </Row>

                      <Row style={{ flex: 15 }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                          <View style={{flex: 15}} />
                          <TouchableOpacity style={{flex: 1, width: 40, height:40}} onPress={this.loginWithFacebook.bind(this)}>
                            <Image style={{width: 40, height: 40}} source={ require('../../../images/facebook.png') }/>
                          </TouchableOpacity>
                          <View style={{flex: 1}} />
                          <TouchableOpacity style={{flex: 1, width: 40, height:40}} onPress={this.loginWithGoogle.bind(this)}>
                            <Image style={{width: 40, height: 40}} source={ require('../../../images/google.png') }/>
                          </TouchableOpacity>
                          <View style={{flex: 14}} />
                        </View>
                      </Row>
                      <Row style={{ flex: 1 }} />
                    </Col>
                    <Col style={{ flex: 5 }} />
                  </Grid>
                </Image>
              </Row>
              <Row style={{ flex: 24 }} />
              <Row style={{ flexDirection: 'row', flex: 5 }}>
                <View style={{ flex: 4 }}/>
                <TouchableOpacity onPress={() => this.replaceRoute('register')}>
                  <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>Sign up</Text>
                </TouchableOpacity>
                <View style={{ flex: 20 }}/>
                <TouchableOpacity onPress={() => this.replaceRouteSkip()}>
                  <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>Skip for now</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}/>
              </Row>
              <Row style={{ flex:1 }} />
            </Col>
            <Col style={{ flex: 10 }} />
          </Grid>
        </Image>
      );
    }
}



function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(Login);

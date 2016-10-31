
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image, Text, Alert, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';
import { replaceRoute } from '../../actions/route';
import Config from '../../Config';

import theme from '../../themes/base-theme';
import styles from './styles';

class Register extends Component {

    constructor(props) {
      super(props);
        this.state = {
          user: null,
          name: null,
          email: null,
          password: null,
          country: null,
          city: null,
          address: null,
          mobile: null,
          phone: null,
      };
    }

    validateEmail (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    replaceRoute(route) {
      global.skiplogin = 0;
      this.props.replaceRoute(route);
    }

    replaceRouteSkip(){
      global.skiplogin = 1;
      this.props.replaceRoute('welcome');
    }

    registerUser() {
      var _this = this;
      if (!this.validateEmail(this.state.email) || !this.state.password || !this.state.name || !this.state.country) {
        Alert.alert('Invalid Credentials','Please input valid NAME, EMAIL address, PASSWORD and COUNTRY.');
      } else {
        if(this.state.password.length >= 6) {
          console.log('Fetching');

          fetch(Config.API_URL + '/auth/signup', {
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
               },
               method: "POST",
               body: JSON.stringify({
                 name: _this.state.name,
                 email: _this.state.email,
                 password: _this.state.password,
                 country: _this.state.country,
                 city: _this.state.city,
                 address: _this.state.address,
                 mobile: _this.state.mobile,
                 phone: _this.state.phone,
                 priority: 3,
                 role: 1})
          })
          .then((response) => response.json())
          .then((responseData) => {
              if(responseData.status_code == 422){
                Alert.alert('Register Failed',responseData.errors[0][0]);
              } else {
                console.log('Register Data: '+JSON.stringify(responseData));

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

                global.NAME =_this.state.name;
                global.COUNTRY=_this.state.country;
                global.CITY=_this.state.city;
                global.ADDRESS=_this.state.adress;
                global.MOBILE=_this.state.mobile;
                global.PHONE=_this.state.phone;
                
                this.replaceRoute('dashboard');
              }
          })
          .done();
        } else {
          Alert.alert('Weak password','Password length must be more than 6 characters.')
        }
      }
    }

    render() {
      return (
        <Image style={{flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={require('../../../images/splash.png')}>
          <Grid>
            <Col style={{ flex: 10 }} />
            <Col style={{ flex: 80 }}>
              <Row style={{ flex: 30 }} />
              <Row style={{ flex: 8 }}>
                <Image style={{ flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={ require('../../../images/logo.png') } />
              </Row>
              <Row style={{ flex: 3 }} />
              <Row style={{ flex: 60 }}>
                <Image style={{ flex: 1, width: null, height: null }} resizeMode={Image.resizeMode.stretch} source={ require('../../../images/login_overlay.png') }>
                  <Grid>
                    <Col style={{ flex: 5 }} />
                    <Col style={{ flex: 90 }}>
                      <Row style={{ flex: 2 }} />
                      <Row style={{ flex: 15 }}>
                        <InputGroup style={{flex: 1, width: null}}>
                            <Icon name="ios-contact" />
                            <Input
                              onChangeText={(text) => this.setState({ firstname: text })}
                              value={this.state.name}
                              controlled={true}
                              placeholderTextColor="#555555"
                              placeholder="NAME"/>
                        </InputGroup>
                      </Row>
                      <Row style={{ flex: 15 }}>
                          <InputGroup style={{flex: 1, width: null}}>
                              <Icon name="ios-at" />
                              <Input
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                                controlled={true}
                                placeholderTextColor="#555555"
                                keyboardType="email-address"
                                placeholder="EMAIL"/>
                          </InputGroup>
                      </Row>
                      <Row style={{ flex: 15 }}>
                          <InputGroup style={{flex: 1, width: null}}>
                              <Icon name="ios-key" />
                              <Input
                                value={this.state.password}
                                controlled={true}
                                onChangeText={(text) => this.setState({ password: text })}
                                placeholderTextColor="#555555"
                                placeholder="PASSWORD"
                                secureTextEntry={true}/>
                          </InputGroup>
                      </Row>
                      <Row style={{ flex: 15 }}>
                        <InputGroup style={{flex: 1, width: null}}>
                            <Icon name="ios-contact" />
                            <Input
                              onChangeText={(text) => this.setState({ country: text })}
                              value={this.state.country}
                              controlled={true}
                              placeholderTextColor="#555555"
                              placeholder="COUNTRY"/>
                        </InputGroup>
                      </Row>
                      <Row style={{ flex: 15 }}>
                        <InputGroup style={{flex: 1, width: null}}>
                            <Icon name="ios-contact" />
                            <Input
                              onChangeText={(text) => this.setState({ city: text })}
                              value={this.state.city}
                              controlled={true}
                              placeholderTextColor="#555555"
                              placeholder="CITY"/>
                        </InputGroup>
                      </Row>
                      <Row style={{ flex: 15 }}>
                        <InputGroup style={{flex: 1, width: null}}>
                            <Icon name="ios-contact" />
                            <Input
                              onChangeText={(text) => this.setState({ address: text })}
                              value={this.state.address}
                              controlled={true}
                              placeholderTextColor="#555555"
                              placeholder="ADDRESS"/>
                        </InputGroup>
                      </Row>
                      <Row style={{ flex: 15 }}>
                        <InputGroup style={{flex: 1, width: null}}>
                            <Icon name="ios-contact" />
                            <Input
                              onChangeText={(text) => this.setState({ mobile: text })}
                              value={this.state.mobile}
                              controlled={true}
                              placeholderTextColor="#555555"
                              placeholder="MOBILE"/>
                        </InputGroup>
                      </Row>
                      <Row style={{ flex: 15 }}>
                        <InputGroup style={{flex: 1, width: null}}>
                            <Icon name="ios-contact" />
                            <Input
                              onChangeText={(text) => this.setState({ phone: text })}
                              value={this.state.phone}
                              controlled={true}
                              placeholderTextColor="#555555"
                              placeholder="PHONE"/>
                        </InputGroup>
                      </Row>
                      <Row style={{ flex: 5 }}/>
                      <Row style={{ flex: 15 }}>
                          <Button block small success style={{flex: 1, width: null}} onPress={this.registerUser.bind(this)}>
                            <Text style={{fontWeight:'bold', color: 'white'}}>REGISTER</Text>
                          </Button>
                      </Row>
                      <Row style={{ flex: 15 }}>
                          <Button block small transparent style={{flex: 1, width: null}} onPress={() => this.replaceRoute('login')}>
                            <Text style={{fontWeight:'bold', color: '#222222'}}>BACK TO MAIN</Text>
                          </Button>
                      </Row>
                      <Row style={{ flex: 1 }} />
                    </Col>
                    <Col style={{ flex: 5 }} />
                  </Grid>
                </Image>
              </Row>
              <Row style={{ flex: 30 }} />
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

export default connect(null, bindActions)(Register);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Spinner } from 'native-base';
import { replaceRoute } from '../../actions/route';



class Splash extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, token: null, login_type: null };
  }
  replaceRoute(route) {
      this.props.replaceRoute(route);
  }

  componentDidMount() {
    AsyncStorage.getItem('LOGIN_TYPE', (err, result) => {
      if(result == null) {
        global.skiplogin = 1;
        this.replaceRoute('welcome');
      } else {
        global.skiplogin=1;
        this.replaceRoute('welcome');
      }
    });

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
            <Row style={{ flex: 40, alignItems:'center', justifyContent: 'center' }} >
              <Spinner color="white" />
            </Row>
            <Row style={{ flex: 30 }} />
          </Col>
          <Col style={{ flex: 10 }} />
        </Grid>
      </Image>
    );
  }
}


function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Splash);

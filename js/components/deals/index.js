import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Spinner } from 'native-base';
import { replaceRoute } from '../../actions/route';
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import DealsDate from './DealsDate';
import DealsPrice from './DealsPrice';
import DealsLastMinute from './DealsLastMinute';

class Deals extends Component {

  constructor(props) {
    super(props);
    this.state = { user: null, token: null, login_type: null };
  }
  replaceRoute(route) {
      this.props.replaceRoute(route);
  }

  render() {
    return (
      <ScrollableTabView
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar style={{height:40}}/>}>
        <DealsDate tabLabel="Date" />
        <DealsPrice tabLabel="Price" />
        <DealsLastMinute tabLabel="Last Minute" />
      </ScrollableTabView>
    );
  }
}


function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}
export default connect(null, bindAction)(Deals);

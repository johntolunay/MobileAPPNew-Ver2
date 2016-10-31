import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { replaceRoute } from '../../actions/route';
import styles from "./styles";
import { globalNav } from '../../AppNavigator';
import { Dashboard } from '../dashboard/'
import { Video } from 'react-native-media-kit';
import { Spinner } from 'native-base';


import Carousel from "react-native-carousel-control";
var { width, height } = Dimensions.get('window');

class Roundabout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      golf_rot: '0deg',
      ski_rot: '10deg',
      test: 0,
      size: {width: width, height: height}
    };

  }
  replaceRoute(route) {
      this.props.replaceRoute(route);
  }
  
  /*<TouchableOpacity onPress={() => {global.world_type = 1; this.replaceRoute('dashboard')}}>
            <Image style={{flex: 1, width: width, height: height, transform: [{rotateY: this.state.golf_rot}]}} resizeMode={Image.resizeMode.cover} source={require('../../../images/golf_full.png')}>

            </Image>
            </TouchableOpacity>*/
            
            /*<TouchableOpacity onPress={() => {global.world_type = 2; this.replaceRoute('dashboard')}}>
                <Image style={{flex: 1, width: width, height: height, transform: [{rotateY: this.state.ski_rot}]}} resizeMode={Image.resizeMode.cover} source={require('../../../images/ski_full.png')}>


                </Image>
            </TouchableOpacity>*/

  render() {
    return (
      <View style={styles.container}>
        <Carousel onPageChange={(val) => {this.setState({test: val}); if(val > 0){
          this.setState({ski_rot: '0deg', golf_rot: '-10deg'});
        }else {
          this.setState({ski_rot: '10deg', golf_rot: '0deg'});
        }}}>
        <Row style={{flex: 5}}>
            
            </Row>
        <Row style={{flex: 5}}>
            
        </Row>
        </Carousel>
      </View>
    );
  }
}
function bindAction(dispatch) {
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Roundabout);

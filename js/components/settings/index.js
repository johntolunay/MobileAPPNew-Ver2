
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';

import theme from '../../themes/base-theme';

class Settings extends Component {

    popRoute() {
        this.props.popRoute();
    }

    render() {
        return (
            <Container>
              <Content>
                <Text>
                  Create Something Awesome . . .
                </Text>
              </Content>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(Settings);


'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var devWid = Dimensions.get('window').width;
var devHei = Dimensions.get('window').height;
module.exports = StyleSheet.create({
  thumb: {
    flex: 1,
  },
  textContainer: {
    flex: 7,
    marginLeft:15
  },
  priceContainer: {
    flex: 3,
    marginTop: 15,
    marginRight:15,
    flexDirection: 'row'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },

  title: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
    fontSize: 20,
    color: 'blue'
  },
  description: {
    flex:1,
    fontSize: 13,
    color: '#FFF'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  adventure_area : {
    width: devWid * .9,
    height: devHei * .3,
    backgroundColor: '#CCC',
    borderRadius: 5
  },
});

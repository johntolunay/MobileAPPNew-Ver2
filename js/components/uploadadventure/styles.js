
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions, PixelRatio } = React;

var devWid = Dimensions.get('window').width;
var devHei = Dimensions.get('window').height;
module.exports = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: 'white',
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 10,
    backgroundColor: '#fff'
  },
  separator_transparent: {
    height: 5,
  },
  separator_line: {
    height: 1,
    backgroundColor: '#AAA'
  },
  heading: {
    backgroundColor: '#F8F8F8',
    alignItems: 'flex-start'
  },

  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 15,
    margin: 5,
    color: '#656565'
  },
  description_holder : {
    height: devHei * .15
  },
  
  adventure_area : {
    width: devWid * .9,
    height: devHei * .3,
    backgroundColor: '#CCC',
    borderRadius: 5
  },
  liadventure_area : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: devWid * .95,
    height: devHei * .3,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  info_area : {
    width: devWid * .9,
    backgroundColor: '#EEE',
    borderRadius: 5
  },
  lititle : {
    width: devWid * .95,
    fontSize: 20,
    color : '#00008B'
  },
  lidescription : {
    width: devWid * .95,
    fontSize: 18,
  },
  li_text_area: {
    width: devWid * .95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
   bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  container_map: {
    flex:1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 12,
    borderRadius: 20,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  latlng: {
    position: 'absolute',
    width: 200,
    alignItems: 'stretch',
    top: devHei *.9,
    left: devWid *.5 - 100,
  },

});

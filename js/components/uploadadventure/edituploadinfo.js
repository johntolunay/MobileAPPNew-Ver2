
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Header, Title, Content, Text, Button, Icon, List, ListItem, InputGroup, Input } from 'native-base';
import { popRoute } from '../../actions/route';
import { pushNewRoute } from '../../actions/route';
import { replaceRoute } from '../../actions/route';
import ImagePicker from 'react-native-image-picker';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Alert, Platform } from 'react-native';
import { Video } from 'react-native-media-kit';
import Config from '../../Config';
import Spinner from 'react-native-loading-spinner-overlay';

import theme from '../../themes/base-theme';
import styles from './styles';


class EditUploadInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUriView: this.props.imageUriView,
            imageUri: this.props.imageUri,
            videoUri: this.props.videoUri,
            mediaType: this.props.mediaType,
            filename: null,
            title: this.props.title,
            description: this.props.description,
            spinnerVisible : false
        };
    }

    pushNewRoute(route) {
        this.props.pushNewRoute(route);
    }

    replaceRoute(route) {
        //this.props.navigator.pop();
        this.props.navigator.replace({
            id: 'chooseposition',
            passProps: {
                imageUriView : this.state.imageUriView,
                imageUri : this.state.imageUri,
                videoUri : this.state.videoUri,
                mediaType : this.state.mediaType,
                title : this.state.title,
                description : this.state.description
            }
        });
    }
    callbackFunction(args) {
          Alert('title',args);
    }

    popRoute() {
        //this.props.popRoute();
        this.props.replaceRoute('dashboard');
    }

    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('ImagePicker.showImagePicker(response): ', JSON.stringify(response));

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                if (!response.data)
                {
                    console.log('response.data is null or empty');

                    return;
                }

                var source, source_upload;

                source = {data: 'image/jpeg;base64,' + response.data, isStatic: true};

                if (Platform.OS === 'android') 
                    source_upload = {data: response.uri, isStatic: true};
                else 
                    source_upload = {data: response.uri.replace('file://', ''), isStatic: true};
                
                this.setState({
                    imageUriView: source,
                    imageUri: source_upload,
                    mediaType: 1
                });
            }
        });
    }

    selectVideoTapped() {
        const options = {
            title: 'Video Picker',
            takePhotoButtonTitle: 'Take Video...',
            mediaType: 'video',
            videoQuality: 'medium'
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    videoUri: response.uri,
                    mediaType: 2
                });
            }
        });
    }

    selectAdventureTapped() {
        Alert.alert(
            'Upload Adventure',
            'Choose the media type of your adventure.',
            [
              {text: 'Image', onPress: () => this.selectPhotoTapped()},
              {text: 'Video', onPress: () => this.selectVideoTapped()},
            ]);
    }

    uploadAdventure() {
        var filename = makeid();
        var formdata = new FormData();

        if (this.state.mediaType === 1 || this.state.mediaType === 2)
        {
            formdata.append('mediatype', this.state.mediaType);

            if(this.state.mediaType === 1) {
                if (!this.state.imageUriView.data)
                {
                    console.log('this.state.imageUriView.data is null or empty');

                    return;
                }

                filename = filename + '.jpg';
         
                formdata.append('thumbnail', "data:" + this.state.imageUriView.data);
            }
            else if(this.state.mediaType === 2) {
                filename = filename + '.mp4';
                formdata.append('movie', {uri: this.state.videoUri, name: filename, type: 'video/mp4'});
              }
        }

        if((this.state.imageUri != null || this.state.videoUri != null) &&
            (this.props.choosen_latitude != null || this.props.choosen_longitude != null) &&
            this.state.title != null && this.state.description != null){

            this.setState({spinnerVisible: true});

            formdata.append('site', global.world_type);
            formdata.append('user', global.USERID );
            formdata.append('name', this.state.title);
            formdata.append('description', this.state.description);
            formdata.append('longitude', this.props.choosen_longitude);
            formdata.append('latitude', this.props.choosen_latitude);
            
            console.log("formdata: " + JSON.stringify(formdata));

            fetch(Config.API_URL + '/adventure/destination', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                    method: "POST",
                    body: formdata
                })
            .then((response) => {
                console.log("response: " + JSON.stringify(response));

                this.setState({spinnerVisible: false});
            
                if (response.status >= 300)
                    Alert.alert('Upload failed', JSON.stringify(response));
                else
                    Alert.alert('Upload succeed','You adventure has been uploaded successfully');

                this.popRoute();
            })
            .done();
        } else {
            Alert.alert('Invalid info','Input all fields to upload your adventure');
        }

    }

    render() {
        let adventureMedia;
        if (this.state.mediaType === undefined) {
            adventureMedia = (
                <Image style={styles.adventure_area} source={require('../../../images/image_video_non.png')}/>
            )
        } else if(this.state.mediaType === 1 && this.state.imageUriView != null) {
            adventureMedia = (
                <Image style={styles.adventure_area}
                        resizeMode={Image.resizeMode.stretch}
                        source={this.state.imageUriView}/>
            )
        } else if(this.state.mediaType === 2 && this.state.videoUri != null) {
            adventureMedia = (
                <Video
                    style={styles.adventure_area}
                    autoplay={true}
                    preload='none'
                    controls={true}
                    loop={true}
                    muted={false}
                    src={this.state.videoUri}
                />
            )
        }

        return (
            <View style={{flex : 1}}>
                <Spinner visible={this.state.spinnerVisible} />
                <Container style={{backgroundColor: 'white'}}>
                    {
                        global.world_type === 1 ?
                        <Header style={{backgroundColor: '#228B22'}} foregroundColor="#fff">
                            <Button transparent onPress={() => this.popRoute()}>
                                <Icon name="ios-arrow-back" style={{color:'white'}} />
                            </Button>
                            <Title>Edit Adventure Info</Title>
                            <Button transparent onPress={() => this.uploadAdventure()}>
                                <Icon name="ios-cloud-upload-outline" style={{color:'white'}} />
                            </Button>
                        </Header>
                        :
                        <Header style={{backgroundColor: '#4169E1'}} foregroundColor="#fff">
                            <Button transparent onPress={() => this.popRoute()}>
                                <Icon name="ios-arrow-back" style={{color:'white'}}/>
                            </Button>
                            <Title>Edit Adventure Info</Title>
                            <Button transparent onPress={() => this.uploadAdventure()}>
                                <Icon name="ios-cloud-upload-outline" style={{color:'white'}} />
                            </Button>
                        </Header>
                    }
                    <Content padder>
                        <View style={{flex: 1}}>
                            <View style={styles.container}>
                                <TouchableOpacity onPress={() => this.selectAdventureTapped()}>
                                    { adventureMedia }
                                </TouchableOpacity>
                                <Content>
                                <View style={styles.separator}/>
                                <List style={styles.info_area}>
                                    <ListItem>
                                        <InputGroup>
                                            <Input style={styles.title}
                                                onChangeText={(text) => this.setState({ title: text })}
                                                value={this.state.title}
                                                controlled={true}
                                                placeholder="Title" />
                                        </InputGroup>
                                    </ListItem>
                                    <ListItem>
                                        <InputGroup style={styles.description_holder}>
                                            <Input style={styles.description}
                                                onChangeText={(text) => this.setState({ description: text })}
                                                value={this.state.description}
                                                controlled={true}
                                                placeholder="Describe your adventure here..." />
                                        </InputGroup>
                                    </ListItem>
                                    <ListItem>
                                        <Button block onPress={() => this.replaceRoute('chooseposition')}>
                                            <Icon name="ios-locate-outline" style={{color:'white'}} />
                                            Choose location on Google Map
                                        </Button>
                                    </ListItem>
                                    <ListItem>
                                        <Text>Latitude: {this.props.choosen_latitude}</Text>
                                    </ListItem>
                                    <ListItem>
                                        <Text>Longitude: {this.props.choosen_longitude}</Text>
                                    </ListItem>
                                </List>
                                </Content>
                            </View>
                        </View>
                    </Content>
                </Container>
            </View>
        )
    }
}
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}



function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(EditUploadInfo);

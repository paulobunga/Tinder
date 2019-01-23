import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import { firebaseListenLogin, loadUserInfo } from '../firebase-api/Firebase_Api';

const SCREEN_WIDTH = Dimensions.get('window').width;

@inject('cardStore')
@observer
class LoadingScreen extends React.Component {
  state = {
    hintValue: 0
  };

  componentWillMount() {
    this.listenLogged();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        hintValue: (this.state.hintValue + 1) % 5
      });
    }, 300);
  }

  timer: any;

  listenLogged() {
    const isLoggedBefore = firebaseListenLogin();
    isLoggedBefore
      .then(value => {
        clearInterval(this.timer);
        loadUserInfo(value.email.split('@')[0]).then(resolve => {
          this.props.cardStore.setUserData(resolve);
          this.props.navigation.navigate('Main');
        });
      })
      .catch(() => {
        clearInterval(this.timer);
        this.props.navigation.navigate('Login');
      });
  }

  renderIcon() {
    const a = [0, 1, 2, 3, 4];
    return a.map((value, index) =>
      value === this.state.hintValue ? (
        <Icon name="primitive-dot" size={16} color="#ffffff" type="octicon" key={index} />
      ) : (
        <Icon name="primitive-dot" size={16} color="#757575" type="octicon" key={index} />
      )
    );
  }

  render() {
    const { containerStyle, imageStyle, iconContainerStyle } = styles;
    return (
      <View style={containerStyle}>
        <Image source={require('../img/facebook_icon.png')} style={imageStyle} />
        <View style={iconContainerStyle}>{this.renderIcon()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    width: 60,
    height: 60,
    marginBottom: 24
  },
  iconContainerStyle: {
    flexDirection: 'row',
    width: SCREEN_WIDTH / 5,
    justifyContent: 'space-between'
  }
});

export default LoadingScreen;

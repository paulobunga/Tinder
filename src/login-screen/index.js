import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator
} from 'react-native';
import { observer, inject } from 'mobx-react';
import { firebaseLogin, loadUserInfo } from '../firebase-api/Firebase_Api';

const WIDTH_SCREEN = Dimensions.get('window').width;

type Style = {
  email: string,
  password: string,
  isLogin: boolean,
  isError: boolean,
  isLoading: boolean
};
@inject('cardStore')
@observer
class Login extends React.Component<{}, Style> {
  state = {
    email: '',
    password: '',
    isLogin: true,
    isError: false,
    isLoading: false
  };

  login(email, password) {
    this.setState({ isLoading: true });
    const loginStatus = firebaseLogin(email, password);
    let isError = false;
    loginStatus.then(value => {
      if (value === 'LogIn' || value === 'SignUp') {
        loadUserInfo(this.state.email.split('@')[0]).then(resolve => {
          this.props.cardStore.setUserData(resolve);
          this.props.navigation.navigate('Main');
        });
      } else {
        isError = true;
        this.setState({ isLoading: false, isError });
      }
    });
  }
  render() {
    const {
      containerStyle,
      childContainerStyle,
      buttonStyle,
      textInputStyle,
      passwordStyle,
      errorTextStyle
    } = styles;
    return (
      <View style={containerStyle}>
        <View style={childContainerStyle}>
          <Image source={require('../img/facebook_icon.png')} style={{ width: 60, height: 60 }} />
        </View>
        <View style={[childContainerStyle, { padding: WIDTH_SCREEN / 20 }]}>
          <TextInput
            style={textInputStyle}
            placeholder="Email or phone number"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={passwordStyle}
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
          />
          {this.state.isError ? (
            <Text style={errorTextStyle}>Wrong Email or Password!!!</Text>
          ) : (
            undefined
          )}
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => {
              this.login(this.state.email, this.state.password);
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '400' }}>
              {this.state.isLogin ? 'Log in' : 'Sign up'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={childContainerStyle}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({
                isLogin: !this.state.isLogin
              });
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: '800', marginBottom: 30 }}>
              {this.state.isLogin ? 'Sign Up for Facebook' : 'Log in to Facebook'}
            </Text>
          </TouchableWithoutFeedback>
          <Text style={{ color: '#ffffff', fontSize: 12 }}>Need help?</Text>
        </View>
        <Modal
          transparent
          visible={this.state.isLoading}
          onRequestClose={() => {
            this.setState({ isLoading: false });
          }}
        >
          <View style={[childContainerStyle, { backgroundColor: 'rgba(0,0,0,0.4)' }]}>
            <ActivityIndicator color="#ffffff" size="large" />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#3b5998'
  },
  childContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    width: '100%',
    marginTop: 6,
    backgroundColor: '#8b9dc3',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  textInputStyle: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#7e6e6e'
  },
  passwordStyle: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    padding: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  errorTextStyle: {
    fontStyle: 'italic',
    fontSize: 14,
    color: 'red',
    alignSelf: 'stretch',
    marginTop: 10,
    textAlign: 'right'
  }
});

export default Login;

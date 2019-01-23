import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import Button from './Button';

type Props = {
  yourAvatar: string,
  herAvatar: string,
  herName: string,
  handleMessage: () => null,
  handleContinue: () => null
};

class Content extends React.Component<Props> {
  render() {
    const {
      containerStyle,
      sloganStyle,
      avatarViewStyle,
      avatarStyle,
      footerViewStyle,
      textStyle
    } = styles;
    const { yourAvatar, herAvatar, herName } = this.props;
    return (
      <View style={containerStyle}>
        <Text style={sloganStyle}>It's a match</Text>
        <Text style={textStyle}>You and {herName} have liked each other.</Text>
        <View style={avatarViewStyle}>
          <Avatar
            rounded
            height={100}
            width={100}
            source={{ uri: yourAvatar }}
            containerStyle={avatarStyle}
          />
          <Avatar
            rounded
            height={100}
            width={100}
            source={{ uri: herAvatar }}
            containerStyle={avatarStyle}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'space-around', marginBottom: 20 }}>
          <Button
            onPress={() => {
              this.props.handleMessage();
            }}
            label="Send a Message"
            icon={{ name: 'ios-chatbubbles', color: '#ffffff', size: 20, type: 'ionicon' }}
          />
          <Button
            onPress={() => {
              this.props.handleContinue();
            }}
            label="Keep Playing"
            icon={{ name: 'user', color: '#ffffff', size: 20, type: 'entypo' }}
          />
        </View>

        <View style={footerViewStyle}>
          <Icon name="share-alternative" type="entypo" size={20} color="#ffffff" />
          <Text style={textStyle}>Tell your friend</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#424242',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sloganStyle: {
    fontSize: 36,
    color: '#ffffff',
    fontFamily: 'Cassandra Personal Use',
    marginTop: 30
  },
  avatarViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '60%',
    height: '30%',
    marginTop: 10
  },
  avatarStyle: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 100,
    overflow: 'hidden'
  },
  footerViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 16,
    color: '#ffffff',
    marginStart: 6
  }
});

export default Content;

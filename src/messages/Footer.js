import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import TextInput from '../components/TextInput';

type Props = {
  message: string,
  handleChangeMessage: text => null,
  sendMessage: () => null
};

const Footer = (props: Props) => {
  const { containerStyle } = styles;
  return (
    <View style={containerStyle}>
      <Icon
        name="sticker-emoji"
        size={24}
        color="#00e676"
        type="material-community"
        containerStyle={{ marginEnd: 6 }}
      />
      <TextInput
        placeholder="Type a message ..."
        icons={[
          {
            name: 'md-send',
            type: 'ionicon',
            color: props.message.length > 0 ? '#00b0ff' : '#757575'
          }
        ]}
        onChangeText={text => {
          props.handleChangeMessage(text);
        }}
        onIconPress={() => {
          props.sendMessage();
        }}
        value={props.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default Footer;

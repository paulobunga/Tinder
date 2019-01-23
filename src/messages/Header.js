import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';

type Props = {
  img: any,
  name: string,
  onBackPress: () => null,
  onSettingPress: () => null
};

const Header = (props: Props) => {
  const { containerStyle, childStyle, textNameStyle } = styles;
  return (
    <View style={containerStyle}>
      <View style={childStyle}>
        <Icon
          name="md-arrow-back"
          type="ionicon"
          color="#ec407a"
          size={20}
          onPress={() => {
            props.onBackPress();
          }}
        />
        <Avatar
          source={{ uri: props.img }}
          small
          rounded
          containerStyle={{ marginStart: 30, marginEnd: 4 }}
        />
        <Text style={textNameStyle}>{props.name}</Text>
      </View>
      <Icon
        name="dots-three-vertical"
        type="entypo"
        size={20}
        color="#ec407a"
        onPress={() => {
          props.onSettingPress();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
    elevation: 4,
    paddingHorizontal: 8,
    backgroundColor: '#ffffff'
  },
  childStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  textNameStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  }
});

export default Header;

import React from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
  icon: {
    name?: string,
    color?: string,
    font?: string,
    size?: number
  },
  label: string,
  viewStyle: {},
  onPress: () => null
};

const Button = (props: Props) => {
  const { icon, label, viewStyle } = props;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress();
      }}
    >
      <View style={[styles.viewStyle, viewStyle]}>
        <Icon {...icon} containerStyle={{ marginEnd: 4 }} />
        <Text style={styles.textStyle}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  viewStyle: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  textStyle: {
    fontSize: 14,
    color: '#ffffff'
  }
};

export default Button;

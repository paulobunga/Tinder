import * as React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void,
  children: React.Node,
  parentStyle: {}
};

const Button = props => (
  <TouchableWithoutFeedback onPress={() => props.onPress()}>
    <View style={[styles.containerStyle]}>{props.children}</View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  containerStyle: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 40,
    backgroundColor: '#ffffff'
  }
});

export default Button;

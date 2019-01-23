import React, { Component } from 'react';
import { StyleSheet, Animated, PanResponder, Easing } from 'react-native';

class MoveObject extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isRight !== this.props.isRight) {
      this.move(nextProps.isRight);
    }
    return true;
  }

  translate: Animated.Value;
  panResponder: PanResponder;
  width: number;

  render() {
    return (
      <Animated.View
        style={[styles.containerStyle, { transform: [{ translateX: this.translate }] }]}
        {...this.panResponder.panHandlers}
        onLayout={evt => {
          this.width = evt.nativeEvent.layout.width;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {}
});

export default MoveObject;

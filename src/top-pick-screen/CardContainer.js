import React, { Component } from 'react';
import { View, PanResponder, Animated, StyleSheet, Dimensions, Easing, Text } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MIN_DRAG = 30; // if above this, it's remove the card
// if gesture exceed this, will turn the status to "left, right, or superlike"

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      canDrag: 0 // 0: initial value, 1 can drag, 2 cannot drag
    };
    this.valueXY = new Animated.ValueXY();
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (
          this.state.canDrag === 0 &&
          Math.abs(gestureState.dy) > 2 &&
          Math.abs(gestureState.dx) < 2
        ) {
          this.setState({
            canDrag: 2
          });
        } else if (this.state.canDrag === 0 && Math.abs(gestureState.dx) > 2) {
          this.setState({
            canDrag: 1
          });
        }
        if (this.state.canDrag === 1) {
          this.valueXY.setValue({
            x: gestureState.dx,
            y: gestureState.dy
          });

          // if dx > MIN_DRAG => "LIKE"

          if (gestureState.dx > MIN_DRAG && -gestureState.dy < MIN_DRAG) {
            this.changeStatus(1);
          } else if (gestureState.dx < -MIN_DRAG && -gestureState.dy < MIN_DRAG) {
            this.changeStatus(2);
          } else {
            this.changeStatus(0);
          }
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({
          canDrag: 0
        });
        switch (this.state.status) {
          case 1:
            if (gestureState.dx > MIN_DRAG * 2.5) {
              this.turnCardToRight();
            } else {
              this.returnToPosition();
            }
            break;
          case 2:
            if (gestureState.dx < -MIN_DRAG * 2.5) {
              this.turnCardToLeft();
            } else {
              this.returnToPosition();
            }
            break;

          default:
            this.returnToPosition();
        }
      }
    });
  }

  changeStatus(status) {
    this.setState({
      status
    });
  }

  renderStatus() {
    const { likeStyle, nopeStyle, textLikeStyle, textNopeStyle } = styles;
    let opacity;

    switch (this.state.status) {
      case 1:
        opacity = this.valueXY.x.interpolate({
          inputRange: [0, SCREEN_WIDTH / 2, SCREEN_WIDTH],
          outputRange: [0, 1, 1]
        });
        return (
          <Animated.View style={[likeStyle, { transform: [{ rotate: '-20deg' }] }, { opacity }]}>
            <Text style={textLikeStyle}>LIKE</Text>
          </Animated.View>
        );
      case 2:
        opacity = this.valueXY.x.interpolate({
          inputRange: [-SCREEN_WIDTH / 2, 0],
          outputRange: [1, 0]
        });
        return (
          <Animated.View style={[nopeStyle, { transform: [{ rotate: '20deg' }] }, { opacity }]}>
            <Text style={textNopeStyle}>NOPE</Text>
          </Animated.View>
        );
      default:
        return undefined;
    }
  }

  panResponder: PanResponder;
  valueXY: Animated.ValueXY;

  render() {
    const rotate = this.valueXY.x.interpolate({
      inputRange: [-SCREEN_WIDTH, -200, 200, SCREEN_WIDTH],
      outputRange: ['-40deg', '-20deg', '20deg', '40deg']
    });
    const { containerStyle } = styles;
    return (
      <Animated.View
        style={[
          containerStyle,
          {
            transform: [{ translateX: this.valueXY.x }, { translateY: this.valueXY.y }, { rotate }]
          }
        ]}
        {...this.panResponder.panHandlers}
      >
        {this.renderStatus()}
        {this.props.children}
      </Animated.View>
    );
  }

  turnCardToLeft() {
    Animated.timing(this.valueXY, {
      toValue: {
        x: -SCREEN_WIDTH * 1.2,
        y: SCREEN_HEIGHT / 2
      },
      duration: 200,
      easing: Easing.linear
    }).start();
  }
  turnCardToRight() {
    Animated.timing(this.valueXY, {
      toValue: {
        x: SCREEN_WIDTH * 1.2,
        y: SCREEN_HEIGHT / 2
      },
      duration: 200,
      easing: Easing.linear
    }).start();
  }
  returnToPosition() {
    Animated.timing(this.valueXY, {
      toValue: { x: 0, y: 0 },
      duration: 300,
      easing: Easing.quad
    }).start();
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden'
  },
  likeStyle: {
    width: 120,
    height: 80,
    borderWidth: 2,
    borderColor: '#00b0ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2
  },
  textLikeStyle: { fontWeight: 'bold', color: '#00b0ff', fontSize: 32 },

  nopeStyle: {
    width: 120,
    height: 80,
    borderWidth: 2,
    borderColor: '#ff3d00',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2
  },
  textNopeStyle: { fontWeight: 'bold', color: '#ff3d00', fontSize: 32 }
});

export default CardContainer;

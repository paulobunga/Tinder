import React, { Component } from 'react';
import { View, StyleSheet, PanResponder, Animated, Dimensions, Easing, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import CardItem from './CardItem';
import CardFooter from './CardFooter';

type Props = {
  cardStore: any
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const MAX_TOUCH = 1; // if below this, it's a touch
const MIN_DRAG = 30; // if above this, it's remove the card
// if gesture exceed this, will turn the status to "left, right, or superlike"
@inject('cardStore')
@observer
class Card extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      status: 0,
      borderRadius: 20
    };

    this.valueXY = new Animated.ValueXY();
    this.moveXWhenBlock = new Animated.Value(0);
    this.moveX = new Animated.Value(0);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        if (this.moveX._value < this.state.height) {
          this.moveXWhenBlock.setValue(gestureState.dy);
          return true;
        }
        this.valueXY.setValue({
          x: gestureState.dx,
          y: gestureState.dy
        });
        // if dx > MIN_DRAG => "LIKE"
        if (gestureState.dx > MIN_DRAG && -gestureState.dy < MIN_DRAG) {
          this.changeStatus(1);
        } else if (gestureState.dx < -MIN_DRAG && -gestureState.dy < MIN_DRAG) {
          this.changeStatus(2);
        } else if (gestureState.dy < 0) {
          this.changeStatus(3);
        } else {
          this.changeStatus(0);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this.moveXWhenBlock._value > 0) {
          this.returnBlockCard();
          return true;
        }
        if (gestureState.dx < MAX_TOUCH && gestureState.dy < MAX_TOUCH) {
          if (
            gestureState.x0 < SCREEN_WIDTH / 2 - 10 &&
            gestureState.y0 < 0.9 * this.state.height
          ) {
            this.props.cardStore.moveImageLeft();
          } else if (
            gestureState.x0 > SCREEN_WIDTH / 2 + 10 &&
            gestureState.y0 < 0.9 * this.state.height
          ) {
            this.props.cardStore.moveImageRight();
          } else {
            this.onOpenBottomCard();
          }
          this.returnToPosition();
        } else {
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
            case 3:
              if (gestureState.dy < -MIN_DRAG) {
                this.turnCardToTop();
              } else {
                this.returnToPosition();
              }
              break;
            default:
              this.returnToPosition();
          }
        }
      }
    });
  }

  panResponder: PanResponder;
  containerResponder: PanResponder;
  valueXY: Animated.ValueXY;

  onOpenBottomCard = () => {
    if (this.moveX._value < this.state.height) {
      Animated.timing(this.moveX, {
        toValue: this.state.height,
        duration: 100,
        easing: Easing.linear
      }).start(() => {
        this.setState({ borderRadius: 20 });
      });
      this.props.cardStore.setCardOpen(true);
    } else {
      Animated.timing(this.moveX, {
        toValue: 0.6 * this.state.height,
        duration: 100,
        easing: Easing.linear
      }).start(() => {
        this.setState({ borderRadius: 0 });
      });
      this.props.cardStore.setCardOpen(false);
    }
  };

  returnBlockCard = () => {
    Animated.timing(this.moveXWhenBlock, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear
    }).start();
  };

  // render the like, nope, super like text in the card when user drag, 1: like, 2: nope, 3: super like
  renderStatus() {
    const {
      likeStyle,
      nopeStyle,
      superLikeStyle,
      textLikeStyle,
      textSuperLikeStyle,
      textNopeStyle
    } = styles;
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
      case 3:
        opacity = this.valueXY.y.interpolate({
          inputRange: [-SCREEN_HEIGHT, -SCREEN_HEIGHT / 2, 0, SCREEN_HEIGHT],
          outputRange: [1, 1, 0, 0]
        });
        return (
          <Animated.View
            style={[superLikeStyle, { transform: [{ rotate: '-20deg' }] }, { opacity }]}
          >
            <Text style={textSuperLikeStyle}>SUPER LIKE</Text>
          </Animated.View>
        );
      default:
        return undefined;
    }
  }

  async changeCardIndex(isLike) {
    this.props.cardStore.moveCard(isLike);
    this.valueXY.setValue({ x: 0, y: 0 });
  }

  turnCardToLeft() {
    Animated.timing(this.valueXY, {
      toValue: {
        x: -SCREEN_WIDTH * 1.2,
        y: SCREEN_HEIGHT / 2
      },
      duration: 200,
      easing: Easing.linear
    }).start(() => {
      this.changeCardIndex(false);
    });
  }
  turnCardToRight() {
    Animated.timing(this.valueXY, {
      toValue: {
        x: SCREEN_WIDTH * 1.2,
        y: SCREEN_HEIGHT / 2
      },
      duration: 200,
      easing: Easing.linear
    }).start(() => {
      this.changeCardIndex(true);
    });
  }
  turnCardToTop() {
    Animated.timing(this.valueXY.y, {
      toValue: -SCREEN_HEIGHT * 2,
      duration: 200,
      easing: Easing.linear
    }).start(() => {
      this.changeCardIndex(true);
    });
  }

  renderCard(cardIndex: number, isFront: boolean) {
    // return when it's undefined
    if (cardIndex < 0) return;
    // if this is a front screen, return with pan responder
    if (isFront) {
      const rotate = this.valueXY.x.interpolate({
        inputRange: [-SCREEN_WIDTH, -200, 200, SCREEN_WIDTH],
        outputRange: ['-40deg', '-20deg', '20deg', '40deg']
      });
      const moveInterpolation = this.moveXWhenBlock.interpolate({
        inputRange: [-SCREEN_WIDTH, 0, 40, 80, SCREEN_WIDTH],
        outputRange: [0, 0, 40, 80, 120]
      });
      return (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 2
            }
          ]}
          {...this.panResponder.panHandlers}
        >
          <Animated.View
            style={[
              {
                width: '100%',
                height: Animated.add(this.moveX, moveInterpolation),
                borderRadius: this.state.borderRadius,
                overflow: 'hidden'
              },
              {
                transform: [
                  { translateX: this.valueXY.x },
                  { translateY: this.valueXY.y },
                  { rotate }
                ]
              }
            ]}
          >
            <CardItem
              onOpenBottomCard={() => {
                this.onOpenBottomCard();
              }}
              shouldMove
            />
            {this.renderStatus()}
          </Animated.View>
          <CardFooter />
        </Animated.View>
      );
    }
    // if this is not a front screen, return view without pan responder

    const scaleX = this.valueXY.x.interpolate({
      inputRange: [-SCREEN_WIDTH, -MIN_DRAG * 4, 0, MIN_DRAG * 4, SCREEN_WIDTH],
      outputRange: [1, 1, 0.9, 1, 1]
    });
    const scaleY = this.valueXY.y.interpolate({
      inputRange: [-SCREEN_WIDTH, -MIN_DRAG * 4, 0, MIN_DRAG * 4, SCREEN_WIDTH],
      outputRange: [1, 1, 0.9, 1, 1]
    });

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            width: '100%',
            height: this.state.height
          },
          {
            transform: [{ scale: this.valueXY.x._value > -this.valueXY.y._value ? scaleX : scaleY }]
          }
        ]}
      >
        <Animated.View
          style={[{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden' }]}
        >
          <CardItem />
        </Animated.View>
      </Animated.View>
    );
  }

  returnToPosition() {
    Animated.timing(this.valueXY, {
      toValue: { x: 0, y: 0 },
      duration: 300,
      easing: Easing.quad
    }).start();
  }

  changeStatus(status) {
    if (this.state.status !== status) {
      this.setState({ status });
    }
  }

  render() {
    const { containerStyle } = styles;
    const { cardIndex, cardLength } = this.props.cardStore;
    return (
      <View
        style={containerStyle}
        onLayout={evt => {
          this.setState({
            width: evt.nativeEvent.layout.width,
            height: evt.nativeEvent.layout.height
          });
          this.moveX.setValue(evt.nativeEvent.layout.height);
        }}
      >
        {this.renderCard(cardIndex, true)}
        {this.renderCard((cardIndex + 1) % cardLength, false)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
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
    left: 20
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
    right: 20
  },
  textNopeStyle: { fontWeight: 'bold', color: '#ff3d00', fontSize: 32 },

  superLikeStyle: {
    width: 120,
    height: 80,
    borderWidth: 2,
    borderColor: '#00b0ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: 100,
    left: SCREEN_WIDTH / 2 - 60
  },
  textSuperLikeStyle: { fontWeight: 'bold', color: '#00b0ff', fontSize: 32, textAlign: 'center' }
});

export default Card;

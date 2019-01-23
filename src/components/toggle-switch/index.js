import React from 'react';
import { View, StyleSheet, PanResponder, Animated, Easing } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
  parentStyle: {},
  moveToLeft: () => {},
  moveToRight: () => {}
};

class Toggle extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.translate = new Animated.Value(0);

    this.panResponderObject = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        if (!this.state.isRight) {
          if (gestureState.dx > 0) {
            this.translate.setValue(Math.min(gestureState.dx, this.width));
          }
        } else if (gestureState.dx < 0) {
          this.translate.setValue(Math.max(gestureState.dx, -this.width));
        }
      },
      onPanResponderRelease: () => {
        if (
          (!this.state.isRight && this.translate._value > this.width / 2) ||
          (this.state.isRight && this.translate._value > -this.width / 2)
        ) {
          this.move(true);
        } else {
          this.move(false);
        }
      }
    });

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        if (evt.nativeEvent.pageX > this.width / 2 && !this.state.isRight) {
          this.move(true);
        }
        if (evt.nativeEvent.pageX < this.width / 2 && this.state.isRight) {
          this.move(false);
        }
      }
    });

    this.state = {
      isRight: false
    };
  }

  move(isRight: boolean) {
    let toValue;
    if (!this.state.isRight) {
      if (!isRight) {
        toValue = 0;
      } else {
        toValue = this.width;
      }
    } else if (!isRight) {
      toValue = -this.width;
    } else {
      toValue = 0;
    }
    Animated.timing(this.translate, {
      toValue,
      duration: 40,
      easing: Easing.linear
    }).start(() => {
      if (!this.state.isRight && isRight) {
        this.translate.setValue(0);
        this.translate.setOffset(this.width);
        this.setState({ isRight: true });
        this.props.moveToRight();
      }
      if (this.state.isRight && !isRight) {
        this.translate.setOffset(0);
        this.translate.setValue(0);
        this.setState({ isRight: false });
        this.props.moveToLeft();
      }
    });
  }

  panResponderObject: PanResponder;
  width: number;
  containerWidth: number;

  render() {
    const { containerStyle, containerIcon, moveObject } = styles;
    return (
      <View style={[containerStyle, this.props.parentStyle]}>
        <View
          style={containerIcon}
          onLayout={evt => {
            this.containerWidth = evt.nativeEvent.layout.width;
          }}
          {...this.panResponder.panHandlers}
        >
          <Icon
            name="fire"
            size={24}
            type="material-community"
            color="#9e9e9e"
            onPress={() => {
              this.move(false);
            }}
          />

          <Icon
            name="diamond"
            size={20}
            type="font-awesome"
            color="#9e9e9e"
            onPress={() => {
              this.move(true);
            }}
          />
        </View>
        <Animated.View
          style={[moveObject, { transform: [{ translateX: this.translate }] }]}
          {...this.panResponderObject.panHandlers}
          onLayout={evt => {
            this.width = evt.nativeEvent.layout.width;
          }}
        >
          {this.state.isRight ? (
            <Icon name="diamond" size={20} type="font-awesome" color="orange" />
          ) : (
            <Icon name="fire" size={24} type="material-community" color="red" />
          )}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  containerIcon: {
    flex: 1,
    margin: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  moveObject: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 30,
    marginStart: 4,
    marginEnd: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  floatIconView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});

export default Toggle;

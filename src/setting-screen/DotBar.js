import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
  color: string,
  index: number,
  length: number
};

class DotBar extends Component<Props> {
  renderDot() {
    const { length, index, color } = this.props;
    const arr = [];
    for (let a = 0; a < length; a++) {
      if (a === index) {
        arr.push(
          <Icon
            name="primitive-dot"
            type="octicon"
            size={16}
            color={color}
            key={a}
            containerStyle={{ margin: 2 }}
          />
        );
      } else {
        arr.push(
          <Icon
            name="primitive-dot"
            type="octicon"
            size={16}
            color="#e0e0e0"
            key={a}
            containerStyle={{ margin: 2 }}
          />
        );
      }
    }
    return arr;
  }
  render() {
    return <View style={{ flexDirection: 'row' }}>{this.renderDot()}</View>;
  }
}
export default DotBar;

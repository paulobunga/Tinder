import React from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Icon } from 'react-native-elements';

type Props = {
  cardStore: any,
  onOpenBottomCard: () => void,
  cardIndex: number
};
@inject('cardStore')
@observer
class CardItem extends React.Component<Props> {
  renderBar(index, length) {
    const arr = [];
    for (let a = 0; a < length; a++) {
      arr.push(
        <View
          style={{
            flex: 1,
            backgroundColor: index === a ? '#ffffff' : '#757575',
            marginHorizontal: 2
          }}
          key={a}
        />
      );
    }
    return arr;
  }

  render() {
    const imageIndex = this.props.shouldMove ? this.props.cardStore.imageIndex : 0;

    const cardData = this.props.shouldMove
      ? this.props.cardStore.cardData
      : this.props.cardStore.cardBelowData;
    const Avatar = Object.values(cardData.Avatar);

    const { containerStyle, barViewStyle, bottomViewStyle, textAgeStyle, textNameStyle } = styles;
    return (
      <ImageBackground
        style={containerStyle}
        resizeMode="cover"
        source={{ uri: Avatar[imageIndex] }}
      >
        <View style={barViewStyle}>{this.renderBar(imageIndex, Avatar.length)}</View>
        <View style={bottomViewStyle}>
          <View
            style={{
              flex: 6,
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row'
            }}
          >
            <Text
              style={[
                textNameStyle,
                this.props.cardStore.isCardOpen ? { color: '#ffffff' } : { color: 'rgba(0,0,0,0)' }
              ]}
            >
              {cardData.Name}
              <Text style={textAgeStyle}> {cardData.Age}</Text>
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Icon
              name="list-ul"
              type="font-awesome"
              color="#ffffff"
              size={28}
              underlayColor="rgba(0,0,0,0)"
              onPress={() => {
                this.props.onOpenBottomCard();
              }}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: '100%'
  },
  barViewStyle: {
    position: 'absolute',
    top: 4,
    left: 18,
    right: 18,
    height: 4,
    flexDirection: 'row'
  },
  bottomViewStyle: {
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  textNameStyle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold'
  },
  textAgeStyle: {
    fontSize: 22,
    fontWeight: 'normal'
  }
});

export default CardItem;

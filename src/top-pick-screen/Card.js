import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from './CardContainer';
import { topPick, cardData } from '../data';

type Props = {
  cardIndex: number
};

class Card extends Component<Props> {
  render() {
    const data = cardData[topPick[this.props.cardIndex]];
    const { bottomViewStyle, textAgeStyle, textNameStyle } = styles;
    return (
      <Container>
        <ImageBackground style={{ flex: 1 }} source={data.img[0]}>
          <View style={bottomViewStyle}>
            <View
              style={{
                flex: 6,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row'
              }}
            >
              <Text style={textNameStyle}>
                {data.name}
                <Text style={textAgeStyle}> {data.age}</Text>
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Icon
                name="star"
                type="font-awesome"
                color="#2962ff"
                size={12}
                underlayColor="rgba(0,0,0,0)"
                iconStyle={{ backgroundColor: '#ffffff', padding: 2, borderRadius: 100 }}
              />
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bottomViewStyle: {
    position: 'absolute',
    width: '100%',
    height: 30,
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  textAgeStyle: {
    fontSize: 14,
    fontWeight: 'normal'
  }
});

export default Card;

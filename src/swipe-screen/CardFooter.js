import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer, inject } from 'mobx-react';

@inject('cardStore')
@observer
class CardFooter extends Component {
  render() {
    const { cardData } = this.props.cardStore;

    const { textAgeStyle, textNameStyle, textDescription } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', minHeight: '60%' }}>
        <View>
          <Text style={textNameStyle}>
            {cardData.Name}
            <Text style={textAgeStyle}> {cardData.Age}</Text>
          </Text>
          <Text style={textDescription}>{cardData.Bio}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textNameStyle: {
    color: '#000000',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginStart: 20
  },
  textAgeStyle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'normal'
  },
  textDescription: {
    color: '#424242',
    fontSize: 20,
    marginStart: 20
  }
});

export default CardFooter;

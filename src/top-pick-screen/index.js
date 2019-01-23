import React, { Component } from 'react';
import { View, FlatList, Dimensions, StyleSheet, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import Card from './Card';
import { cardData, topPick } from '../data';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const Header = () => {
  const { headerStyle, textDescriptionStyle, textHeaderStyle } = styles;
  return (
    <View style={headerStyle}>
      <Text style={textHeaderStyle}>Top Picks</Text>
      <Text style={textDescriptionStyle}>Featured profiles of the day,</Text>
      <Text style={textDescriptionStyle}>picked just for you</Text>
    </View>
  );
};

// @inject('navigationStore')
// @observer
class TopPickScreen extends Component {
  // componentDidMount() {
  //   this.props.navigation.addListener('willFocus', () => {
  //     this.props.navigationStore.changeScreenIndex(2);
  //   });
  // }

  renderItem = ({ item }) => (
    <View style={{ width: '49%', height: SCREEN_HEIGHT * 0.4, margin: 3 }}>
      <Card cardIndex={item} />
    </View>
  );
  render() {
    return (
      <FlatList
        ListHeaderComponent={<Header />}
        data={topPick}
        extraData={this.state}
        keyExtractor={item => item}
        renderItem={this.renderItem}
        numColumns={2}
        horizontal={false}
        onScrollBeginDrag={() => {}}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeaderStyle: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold'
  },
  textDescriptionStyle: {
    fontSize: 24,
    color: '#212121',
    fontWeight: 'bold'
  }
});

export default TopPickScreen;

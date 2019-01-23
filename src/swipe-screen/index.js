import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import Card from './Card';
import Match from './match';

// @inject('navigationStore', 'cardStore')
@inject('cardStore')
@observer
class SwipeScreen extends React.Component {
  componentDidMount() {
    // this.props.navigation.addListener('willFocus', () => {
    //   this.props.navigationStore.changeScreenIndex(1);
    // });
    this.props.cardStore.loadCardData(false);
  }

  renderViewLoading = () => {
    const { loadingViewStyle } = styles;
    return (
      <View style={loadingViewStyle}>
        <ActivityIndicator size="large" color="#ff8f00" />
      </View>
    );
  };

  renderEnded = () => {
    const { loadingViewStyle, textStyle } = styles;
    return (
      <View style={loadingViewStyle}>
        <Text style={textStyle}>There are no one around you</Text>
      </View>
    );
  };

  render() {
    const { isLoaded, isEnded } = this.props.cardStore;
    if (!isLoaded && !isEnded) {
      return this.renderViewLoading();
    }
    if (!isLoaded && isEnded) {
      return this.renderEnded();
    }
    return (
      <View style={{ flex: 1 }}>
        <Card />
        <Match />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingViewStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    fontSize: 16,
    color: '#000000'
  }
});

export default SwipeScreen;

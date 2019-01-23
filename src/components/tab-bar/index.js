import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { observer, inject } from 'mobx-react';
import Toggle from '../toggle-switch';

@inject('navigationStore')
@observer
class TabBar extends Component {
  render() {
    const { screenIndex, changeScreenIndex } = this.props.navigationStore;
    const { containerStyle, itemContainerStyle } = styles;
    return (
      <View style={containerStyle}>
        <View style={itemContainerStyle}>
          <Icon
            name="user-circle"
            type="font-awesome"
            size={24}
            color={screenIndex === 0 ? 'red' : '#9e9e9e'}
            onPress={() => {
              changeScreenIndex(0);
              this.props.navigation.navigate('Settings');
            }}
          />
        </View>
        <View style={itemContainerStyle}>
          {screenIndex === 1 || screenIndex === 2 ? (
            <View style={{ width: 75, height: 40 }}>
              <Toggle
                moveToLeft={() => {
                  this.props.navigation.navigate('Swipe');
                  changeScreenIndex(1);
                }}
                moveToRight={() => {
                  this.props.navigation.navigate('TopPick');
                  changeScreenIndex(2);
                }}
              />
            </View>
          ) : (
            <Icon
              name="fire"
              size={28}
              type="material-community"
              color="#9e9e9e"
              onPress={() => {
                changeScreenIndex(1);
                this.props.navigation.navigate('Swipe');
              }}
            />
          )}
        </View>
        <View style={itemContainerStyle}>
          <Icon
            name="message-processing"
            type="material-community"
            size={24}
            color={screenIndex === 3 ? 'red' : '#9e9e9e'}
            onPress={() => {
              changeScreenIndex(3);
              this.props.navigation.navigate('Message');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  itemContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default withNavigation(TabBar);

import React, { Component } from 'react';
import { createMaterialTopTabNavigator, SafeAreaView } from 'react-navigation';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import SettingScreen from '../setting-screen';
import SwipeScreen from '../swipe-screen';
import TopPickScreen from '../top-pick-screen';
import MessageScreen from '../message-screen';
import TabBar from '../components/tab-bar';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Settings: {
      screen: SettingScreen
    },
    Swipe: {
      screen: SwipeScreen
    },
    TopPick: {
      screen: TopPickScreen
    },
    Message: {
      screen: MessageScreen
    }
  },
  {
    tabBarOptions: {
      showIcon: false,
      showLabel: false,
      style: {
        height: 0
      },
      tabStyle: {
        height: 0
      }
    },
    tabBarComponent: () => (
      <View style={{ width: '100%', height: 60 }}>
        <TabBar />
      </View>
    )
  }
);

export default TabNavigator;

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

type Props = {
  data: {
    Name: string,
    Age: number,
    WorkStatus: string,
    Avatar: any
  }
};

class Header extends Component<Props> {
  render() {
    const { containerStyle, textStyle } = styles;
    const { Name, Age, WorkStatus, Avatar: Avatars } = this.props.data;
    return (
      <View style={containerStyle}>
        <Avatar height={140} width={140} rounded source={{ uri: Object.values(Avatars)[0] }} />
        <Text style={textStyle}>
          {Name}, {Age}
        </Text>
        <Text style={{ color: '#000000' }}>{WorkStatus}</Text>
        <View style={{ flexDirection: 'row', alignSelf: 'stretch', height: '20%', margin: 20 }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderEndWidth: 1,
              borderColor: '#eeeeee'
            }}
          >
            <Avatar
              medium
              rounded
              overlayContainerStyle={{ backgroundColor: '#eeeeee' }}
              icon={{ name: 'md-settings', type: 'ionicon', size: 20, color: '#9e9e9e' }}
            />
            <Text>SETTINGS</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Avatar
              medium
              rounded
              overlayContainerStyle={{ backgroundColor: '#eeeeee' }}
              icon={{ name: 'edit', type: 'entypo', size: 20, color: '#9e9e9e' }}
            />
            <Text>SETTINGS</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '30%'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10
  }
});

export default Header;

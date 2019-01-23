import React from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import Header from './Header';
import ScrollLogan from './ScrollLogan';
import Button from '../components/Button';
import { sloganData } from '../data';

@inject('navigationStore', 'cardStore')
@observer
class SettingScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.props.navigationStore.changeScreenIndex(0);
    });
  }

  render() {
    const { userData } = this.props.cardStore;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fafafa',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View style={{ width: '100%', height: '80%' }}>
          <Header data={userData} />
        </View>
        <ScrollLogan data={sloganData} parentStyle={{ width: '100%', height: '12%' }} />
        <View style={{ margin: '1.5%' }}>
          <Button>
            <Text style={{ color: '#ff5722', fontSize: 14, fontWeight: 'bold' }}>
              GET TINDER PLUS
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default SettingScreen;

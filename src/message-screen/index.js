import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import SearchInput from './SearchInput';
import NewMatch from './NewMatch';

@inject('navigationStore', 'cardStore', 'messageStore')
@observer
class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props.cardStore.loadImageMatch();
  }
  componentDidMount() {
    this.props.navigation.addListener('willFocus', () => {
      this.props.navigationStore.changeScreenIndex(3);
    });
  }

  render() {
    console.log(toJS(this.props.cardStore));

    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: '100%', height: '10%', marginStart: 10 }}>
          <SearchInput matchNumber={12} />
        </View>
        <NewMatch
          data={toJS(this.props.cardStore)}
          parentStyle={{ marginStart: 16 }}
          changeToMessage={userID => {
            this.props.messageStore.setFirstUserId(this.props.cardStore.userData.Id);
            this.props.messageStore.setSecondUserId(userID);
            this.props.navigation.navigate('MessageDetail');
          }}
        />
      </View>
    );
  }
}

export default MessageScreen;

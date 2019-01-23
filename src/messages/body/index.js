import React from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import MessageItem from './MessageItem';
import { inject, observer } from 'mobx-react';
import { reaction, toJS } from 'mobx';

type Props = {
  store: Array<{
    Data: string,
    Date: string,
    From: string
  }>,
  mainUserId: string
};

@inject('messageStore')
@observer
class Body extends React.Component<Props> {
  componentDidMount() {
    this.typing = Keyboard.addListener('keyboardDidShow', this.showTyping);
    this.notType = Keyboard.addListener('keyboardDidHide', this.notTyping);
    setTimeout(() => {
      this.flatListRef.scrollToEnd();
    }, 4);
    this.scrollToEnd = reaction(
      () => this.props.messageStore.message.store,
      () => {
        setTimeout(() => {
          this.flatListRef.scrollToEnd();
        }, 4);
      }
    );
  }

  componentWillUnmount() {
    this.typing.remove();
    this.notType.remove();
  }

  showTyping() {}

  notTyping() {}

  renderMessage = ({ item }) => {
    if (item.From === this.props.messageStore.firstUser.Id) {
      return (
        <View style={{ alignSelf: 'stretch', alignItems: 'flex-end', margin: 3 }}>
          <MessageItem kind="from" Data={item.Data} />
        </View>
      );
    }
    return (
      <View style={{ alignSelf: 'stretch', alignItems: 'flex-start', margin: 3 }}>
        <MessageItem kind="to" Data={item.Data} />
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={Object.values(this.props.messageStore.message.store)}
        extraData={this.state}
        keyExtractor={(item, index) => `${index} `}
        renderItem={this.renderMessage}
        ref={elm => (this.flatListRef = elm)}
      />
    );
  }
}

export default Body;

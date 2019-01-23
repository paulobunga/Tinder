import React from 'react';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Avatar } from 'react-native-elements';
import Header from './Header';
import Footer from './Footer';
import Body from './body';

type Props = {
  userId: number
};

@inject('messageStore')
@observer
class Message extends React.Component<Props> {
  componentDidMount() {
    // const userID = this.props.navigation.getParam('userID', 'U01');
    this.props.messageStore.getCurrentChatData();
  }

  state = {
    textInput: ''
  };

  renderScreen() {
    const data = this.props.messageStore.secondUser;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: '100%', height: 50, position: 'absolute', top: 0, left: 0 }}>
          <Header
            img={Object.values(data.Avatar)[0]}
            name={data.Name}
            onBackPress={() => {
              this.props.navigation.goBack();
            }}
            onSettingPress={() => {}}
          />
        </View>

        <View style={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 44, padding: 10 }}>
          <Body />
        </View>

        <View
          style={{
            height: 40,
            position: 'absolute',
            bottom: 4,
            left: 4,
            right: 4
          }}
        >
          <Footer
            message={this.state.textInput}
            handleChangeMessage={textInput => {
              this.setState({ textInput });
            }}
            sendMessage={() => {
              this.props.messageStore.sendMessage(this.state.textInput);
              this.setState({ textInput: '' });
            }}
          />
        </View>
      </View>
    );
  }

  render() {
    return this.props.messageStore.isLoadDataSuccess ? this.renderScreen() : <View />;
  }
}

export default Message;

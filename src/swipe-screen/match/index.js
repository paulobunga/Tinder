import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { observer, inject } from 'mobx-react';
import Content from './Content';

type Props = {
  cardStore: {}
};

@inject('cardStore')
@observer
class Match extends Component<Props> {
  render() {
    const { cardStore } = this.props;
    return (
      <Modal
        visible={cardStore.modalVisible}
        animationType="slide"
        onRequestClose={() => {
          cardStore.setModalVisible(false);
        }}
        transparent={false}
      >
        {cardStore.modalVisible ? (
          <Content
            handleMessage={() => {}}
            handleContinue={() => {
              cardStore.setModalVisible(false);
            }}
            yourAvatar={Object.values(cardStore.userData.Avatar)[0]}
            herAvatar={Object.values(cardStore.savedData.Avatar)[0]}
            herName={cardStore.savedData.Name}
          />
        ) : (
          undefined
        )}
      </Modal>
    );
  }
}

export default Match;

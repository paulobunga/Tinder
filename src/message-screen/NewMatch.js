import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Avatar } from 'react-native-elements';

type Props = {
  data: [], // contain avatars image require,
  changeToMessage: () => null
};

class NewMatch extends Component<Props> {
  renderItem = ({ item }) => (
    <TouchableWithoutFeedback
      onPress={() => {
        this.props.changeToMessage(item.Id);
      }}
    >
      <Avatar
        width={60}
        height={60}
        rounded
        source={{ uri: item.uri }}
        containerStyle={{ margin: 4 }}
      />
    </TouchableWithoutFeedback>
  );

  render() {
    const { containerStyle, textStyle } = styles;
    console.log(this.props.data.ImageMatch);
    return (
      <View style={[containerStyle, this.props.parentStyle]}>
        <Text style={textStyle}>New Matches</Text>
        <View style={{ marginStart: 10, marginEnd: 10 }}>
          <FlatList
            data={this.props.data.ImageMatch}
            extraData={this.state}
            keyExtractor={(item, index) => `${index} `}
            renderItem={this.renderItem}
            horizontal
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1
  },
  textStyle: {
    fontSize: 14,
    color: '#ec407a',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20
  }
});

export default NewMatch;

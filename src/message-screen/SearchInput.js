import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
  matchNumber: number,
  parentStyle: {}
};

class SearchInput extends React.Component<Props> {
  state = {
    text: ''
  };
  render() {
    const { containerStyle } = styles;
    return (
      <View style={[containerStyle, this.props.parentStyle]}>
        <Icon name="search" size={22} color="#ec407a" />
        <TextInput
          placeholder={`Search ${this.props.matchNumber} matches`}
          value={this.state.text}
          placeholderColor="#fafafa"
          style={{ marginStart: 8, padding: 0 }}
          onChangeText={text => {
            this.setState({ text });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    padding: 4,
    flexDirection: 'row'
  }
});

export default SearchInput;

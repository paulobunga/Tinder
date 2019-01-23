import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  kind: 'from' | 'to', // from mean you, to mean another
  Data: string
};

const MessageItem = (props: Props) => {
  const viewStyle = props.kind === 'from' ? styles.messageFromStyle : styles.messageToStyle;
  return (
    <View
      style={[
        {
          minHeight: 20,
          minWidth: 100,
          maxWidth: 180,
          backgroundColor: props.kind === 'from' ? '#448aaf' : '#bdbdbd'
        },
        viewStyle
      ]}
    >
      <Text
        style={{ padding: 10, fontSize: 14, color: props.kind === 'from' ? '#ffffff' : '#000000' }}
      >
        {props.Data}
      </Text>
    </View>
  );
};

const styles = {
  messageToStyle: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  messageFromStyle: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  }
};

export default MessageItem;

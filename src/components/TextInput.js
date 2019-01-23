// @flow
import React from 'react';
import { View, TextInput as ReTextInput } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
  placeholder: string,
  icons: Array<any>,
  textStyle: {},
  textContainerStyle: {},
  placeholderTextColor: string,
  onChangeText: string => null,
  value: string
};
const TextInput = (props: Props) => {
  const { containerStyle, textInputStyle, containerIconStyle } = styles;
  const { placeholder, icons, textStyle, textContainerStyle, placeholderTextColor } = props;
  const iconsNode = [];
  if (icons) {
    icons.forEach((element, index) => {
      iconsNode.push(
        <Icon
          {...element}
          key={index}
          onPress={() => {
            props.onIconPress();
          }}
        />
      );
    });
  }

  return (
    <View style={[containerStyle, textContainerStyle]}>
      <ReTextInput
        style={[textInputStyle, textStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={text => {
          props.onChangeText(text);
        }}
        value={props.value}
      />
      <View style={containerIconStyle}>{iconsNode}</View>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#7c8491',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 4
  },
  textInputStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginStart: 12,
    padding: 0,
    color: '#646464',
    flex: 1
  },
  containerIconStyle: {
    flexDirection: 'row',
    marginEnd: 4
  }
};

export default TextInput;

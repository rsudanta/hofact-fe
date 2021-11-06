import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const TextArea = ({label, placeholder, ...restProps}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#8D92A3"
        placeholder={placeholder}
        style={styles.input}
        multiline={true}
        numberOfLines={6}
        {...restProps}
      />
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  label: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#020202'},
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    color: 'black'
  },
});

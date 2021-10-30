import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

const ImagePicker = ({label, placeholder, onPress, ...restProps}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <TouchableOpacity onPress={onPress} style={{width: 80}}>
          <Text style={styles.add}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  label: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#020202'},
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    fontSize: 58,
    textAlign: 'center',
    fontFamily: 'Poppins-Light'
  }
});

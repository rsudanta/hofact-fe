import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcAddImage} from '../../../assets';

const ImagePicker = ({label, placeholder, onPress, ...restProps}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onPress} style={{width: 80}}>
        <View style={styles.input}>
          <IcAddImage />
        </View>
      </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

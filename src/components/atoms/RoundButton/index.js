import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const RoundButton = ({onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.container}>
      <View>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: '#1D2D8C',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: 20,
    elevation: 5,
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 48,
    color: 'white',
  }
});

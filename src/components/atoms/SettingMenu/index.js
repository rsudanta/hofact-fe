import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcMore} from '../../../assets';

const SettingMenu = ({menu, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.container}>
        <Text style={styles.text}>{menu}</Text>
        <IcMore />
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );
};

export default SettingMenu;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    color: 'black',
  },
  line: {
    borderColor: '#C4C4C4',
    borderWidth: 0.7,
    marginHorizontal: 24
  }
});

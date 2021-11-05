import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack, IcSetting} from '../../../assets';
import {useNavigation} from '@react-navigation/core';

const HeaderSetting = ({page, onBack}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
          <View style={styles.back}>
            <IcBack />
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>{page}</Text>
      </View>
    </>
  );
};

export default HeaderSetting;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: 'black',
    marginLeft: 12
  },
});

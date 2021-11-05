import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcSetting} from '../../../assets';
import {useNavigation} from '@react-navigation/core';

const HeaderProfile = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Profil</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <IcSetting />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: 'black'
  },
});

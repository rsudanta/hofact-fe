import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcSetting} from '../../../assets';

const HeaderProfile = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Profil</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
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
    backgroundColor: 'white'
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: 'black',
  }
});

import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {IcBackWhite, MiniLogo} from '../../../assets';

const HeaderLogo = ({onBack}) => {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
          <IcBackWhite />
        </TouchableOpacity>
        <MiniLogo />
        <View />
      </View>
    </>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D2D8C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    elevation: 5
  },
});

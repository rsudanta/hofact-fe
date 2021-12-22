import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SettingMenu } from '../../components';

const Setting = ({ navigation }) => {
  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
    });
  };
  return (
    <View style={styles.page}>
      <SettingMenu
        menu="Ganti Profil"
        onPress={() => {
          navigation.replace('EditProfile');
        }}
      />
      <SettingMenu
        menu="Ganti Password"
        onPress={() => {
          navigation.replace('EditPassword');
        }}
      />
      <SettingMenu menu="Keluar" onPress={signOut} />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
});

import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ProfileDummy} from '../../../assets';

const HomeHeader = () => {
  return (
    <View style={styles.headContainer}>
      <View>
        <Text style={styles.appName}>Beranda</Text>
        <Text style={styles.subTitle}>Temukan jawabanmu!</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={ProfileDummy} style={styles.profile} />
        <Text style={styles.exp}>10/100XP</Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  profile: {width: 50, height: 50, borderRadius: 8},
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: 'white'
  },
  profileContainer: {
    alignItems: 'center'
  },
  exp: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    paddingTop: 7,
    color: 'black'
  },
  appName: {fontSize: 22, fontFamily: 'Poppins-Medium', color: '#020202'},
  subTitle: {fontSize: 14, fontFamily: 'Poppins-Light', color: '#8D92A3'}
});

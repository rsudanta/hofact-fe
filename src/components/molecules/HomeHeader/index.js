import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {pointRule} from '../../../utils';

const HomeHeader = ({image, poin, onPress}) => {
  const {loadPost} = useSelector(state => state.globalReducer);

  return (
    <View style={styles.headContainer}>
      <View>
        <Text style={styles.appName}>Beranda</Text>
        <Text style={styles.subTitle}>Temukan jawabanmu!</Text>
      </View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={styles.profileContainer}>
          {loadPost ? (
            <SkeletonPlaceholder>
              <View style={styles.profile} />
              <View
                style={{width: 50, height: 8, borderRadius: 4, marginTop: 8}}
              />
            </SkeletonPlaceholder>
          ) : (
            <View>
              <Image source={{uri: image}} style={styles.profile} />
              {pointRule(poin)}
            </View>
          )}
        </View>
      </TouchableOpacity>
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
  appName: {fontSize: 22, fontFamily: 'Poppins-Medium', color: '#020202'},
  subTitle: {fontSize: 14, fontFamily: 'Poppins-Light', color: '#8D92A3'}
});

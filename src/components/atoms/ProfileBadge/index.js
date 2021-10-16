import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ProfileDummy} from '../../../assets';

const ProfileBadge = ({name, badge, date, image}) => {
  return (
    <View style={styles.headContainer}>
      <Image source={image} style={styles.profile} />
      <View>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.dateContainer}>
          <Text style={styles.badge}>{badge}</Text>
          <View style={styles.dot} />
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileBadge;

const styles = StyleSheet.create({
  headContainer: {flexDirection: 'row', alignItems: 'center'},
  profile: {
    borderRadius: 50,
    width: 40,
    height: 40,
    marginRight: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black'
  },
  badge: {
    fontFamily: 'Poppins-Light',
    color: 'black',
    fontSize: 14
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#8D8B8B',
    marginHorizontal: 6
  },
  date: {
    fontFamily: 'Poppins-Light',
    color: '#8D8B8B',
    fontSize: 13
  },
});

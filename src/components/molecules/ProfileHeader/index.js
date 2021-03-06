import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfileDummy } from '../../../assets';
import { formatedBadge } from '../../../utils';

const ProfileHeader = ({ image, name, badge, role }) => {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.borderPhoto}>
          <Image source={{ uri: image }} style={styles.photoContainer} />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.badge}>{formatedBadge(badge, role)}</Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingBottom: 26,
    flex: 1
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    padding: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: { alignItems: 'center' },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    paddingTop: 16,
    color: 'black',
    textAlign: 'center',
  },
  badge: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#8F9AD8',
  },
});

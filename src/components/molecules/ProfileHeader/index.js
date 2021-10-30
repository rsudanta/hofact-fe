import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProfileDummy} from '../../../assets';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.borderPhoto}>
            <Image source={ProfileDummy} style={styles.photoContainer} />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>Alvina Vania</Text>
        <Text style={styles.badge}>Pemula</Text>
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
  center: {alignItems: 'center'},
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    paddingTop: 16,
    color: 'black'
  },
  badge: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: '#8F9AD8',
  },
});

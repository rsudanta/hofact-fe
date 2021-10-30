import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ProfileDummy} from '../../../assets';
import {API_HOST} from '../../../config';
import {getData} from '../../../utils';

const HomeHeader = () => {
  const [photo, setPhoto] = useState(ProfileDummy);
  const [poin, setPoin] = useState('');

  useEffect(() => {
    getData('userProfile').then(res => {
      setPhoto({uri: res.profile_photo_url});
      setPoin(res.poin);
    });
    // getData('token').then(res => {
    //   axios
    //     .get(`${API_HOST.url}/user`, {
    //       headers: {
    //         Authorization: res.value,
    //       },
    //     })
    //     .then(res => {
    //       setPoin(res.data.data.poin);
    //     })
    //     .catch(err => {
    //       console.log('eror poin', err);
    //     });
    // });
  }, []);

  return (
    <View style={styles.headContainer}>
      <View>
        <Text style={styles.appName}>Beranda</Text>
        <Text style={styles.subTitle}>Temukan jawabanmu!</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image source={photo} style={styles.profile} />
        <Text style={styles.exp}>{poin}/100XP</Text>
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

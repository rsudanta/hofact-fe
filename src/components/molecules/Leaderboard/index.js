import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {formatedBadge, getData} from '../../../utils';

const Leaderboard = ({color = '#FFC700'}) => {
  const {leaderboard} = useSelector(state => state.profileReducer);
  const [authID, setAuthID] = useState('');

  useEffect(() => {
    getData('userProfile').then(res => {
      setAuthID(res.id);
    });
  }, []);

  return (
    <View style={styles.page}>
      {leaderboard.map((item, index) => {
        return (
          <View key={item.id}>
            <View style={styles.container(authID == item.id ? color : 'white')}>
              <Text style={styles.number}>{index + 1}</Text>
              <Image
                source={
                  item.photo_path == null
                    ? {uri: item.profile_photo_url}
                    : {
                        uri: `https://hofact.masuk.id/storage/public/${item.photo_path}`
                      }
                }
                style={styles.image}
              />
              <View style={styles.nameContainer}>
                <Text numberOfLines={1} style={styles.name}>
                  {authID == item.id ? 'Kamu' : item.name}
                </Text>
                <Text style={styles.badge}>{formatedBadge(item.poin)}</Text>
              </View>
              <Text style={styles.exp}>{item.poin}XP</Text>
            </View>
            <View style={styles.line} />
          </View>
        );
      })}
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: color => ({
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: color
  }),
  number: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'black'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginLeft: 18,
  },
  nameContainer: {
    marginLeft: 12,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
    width: 180,
  },
  badge: {
    fontFamily: 'Poppins-Light',
    fontSize: 14,
    color: 'black'
  },
  exp: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
    flex: 1,
    textAlign: 'right'
  },
  line: {
    borderColor: '#C4C4C4',
    borderWidth: 0.7,
    marginHorizontal: 24
  }
});

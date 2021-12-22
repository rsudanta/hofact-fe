import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Badge} from '..';
import {Gap} from '../..';
import {IcAnswerProgress, IcAsk, IcBadge, IcExp} from '../../../assets';
import {formatedBadge} from '../../../utils';

const Progress = () => {
  const {profile, postUser, answerUser} = useSelector(
    state => state.profileReducer
  );

  return (
    <View style={styles.page}>
      <View style={styles.statisticContainer}>
        <Text style={styles.title}>Statistik</Text>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <IcExp />
              <Text style={styles.primaryText}>{profile.poin} XP</Text>
            </View>
            <Text style={styles.secondaryText}>Total Poin</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <IcBadge />
              <Text style={styles.primaryText}>
                {formatedBadge(profile.poin, profile.role)}
              </Text>
            </View>
            <Text style={styles.secondaryText}>Gelar</Text>
          </View>
        </View>
        <Gap height={12} />
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <IcAsk />
              <Text style={styles.primaryText}>{postUser.length}</Text>
            </View>
            <Text style={styles.secondaryText}>Total Pertanyaan</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <IcAnswerProgress />
              <Text style={styles.primaryText}>{answerUser.length}</Text>
            </View>
            <Text style={styles.secondaryText}>Total Jawaban</Text>
          </View>
        </View>
      </View>
      <View style={styles.achievementContainer}>
        <Text style={styles.title}>Pencapaian</Text>
        <Badge poin={profile.poin} />
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
  statisticContainer: {
    paddingVertical: 24,
    paddingHorizontal: 17
  },
  achievementContainer: {
    paddingHorizontal: 24
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 7,
  },
  card: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#C4C4C4',
    paddingVertical: 14,
    borderRadius: 15,
    paddingHorizontal: 24,
    marginHorizontal: 7,
    flex: 1,
    justifyContent: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryText: {
    color: '#1D2D8C',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    paddingLeft: 8
  },
  secondaryText: {
    color: '#8F9AD8',
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    paddingLeft: 22
  },
});

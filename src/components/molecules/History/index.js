import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gap} from '../..';
import {IcAnswer} from '../../../assets';

const History = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Apa benar membersihkan wajah harus double cleansing?
      </Text>
      <View style={styles.bottomContainer}>
        <View style={styles.answerContainer}>
          <IcAnswer />
          <Text style={styles.countAnswer}>3</Text>
        </View>
        <Text style={styles.date}>6 Maret 2021</Text>
      </View>
      <Gap height={10} />
      <View style={styles.line} />
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 24,
    backgroundColor: 'white'
  },
  text: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 14
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countAnswer: {
    color: '#8F9AD8',
    paddingLeft: 4,
    fontFamily: 'Poppins-Medium'
  },
  date: {
    color: '#8D8B8B',
    fontFamily: 'Poppins-Regular',
    fontSize: 12
  },
  line: {
    borderColor: '#C4C4C4',
    borderWidth: 0.7
  },
});

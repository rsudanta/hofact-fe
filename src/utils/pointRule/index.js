import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const pointRule = poin => {
  if (poin < 100) {
    return <Text style={styles.exp}>{poin}/100 XP</Text>;
  }
  if (poin < 200) {
    return <Text style={styles.exp}>{poin}/200 XP</Text>;
  }
  if (poin < 300) {
    return <Text style={styles.exp}>{poin}/300 XP</Text>;
  }
  return <Text style={styles.exp}>{poin} XP</Text>;
};
const styles = StyleSheet.create({
  exp: {
    fontSize: 12,
    fontFamily: 'Poppins-Light',
    paddingTop: 7,
    color: 'black'
  }
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {EmptyIllustration} from '../../../assets';

const EmptyAnswer = ({text}) => {
  return (
    <View style={styles.container}>
      <EmptyIllustration />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default EmptyAnswer;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  }
});

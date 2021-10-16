import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcPoint} from '../../../assets';

const Button = ({
  text,
  color = '#1D2D8C',
  textColor = 'white',
  onPress,
  answer
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container(color)}>
        <Text style={styles.text(textColor)}>{text}</Text>
        {answer && (
          <View style={styles.pointContainer}>
            <IcPoint style={styles.ic} />
            <Text style={styles.textAlt}>+10 XP</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: color => ({
    backgroundColor: color,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  }),
  text: color => ({
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: color,
    textAlign: 'center',
  }),
  pointContainer: {flexDirection: 'row', alignItems: 'center'},
  ic: {
    marginLeft: 12,
  },
  textAlt: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    marginLeft: 3,
    textAlign: 'center',
  },
});

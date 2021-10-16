import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {IcCalendar} from '../../../assets';

const DateSelector = ({label}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(true)}>
          <View style={styles.form}>
            <Text style={styles.text}>
              {date.toDateString().split(' ').slice(1).join(' ')}
            </Text>
            <IcCalendar />
          </View>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  label: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#020202'},
  text: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginTop: 2,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 13},
});

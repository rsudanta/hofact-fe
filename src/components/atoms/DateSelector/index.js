import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {IcCalendar} from '../../../assets';

const DateSelector = ({label, tanggal, onValueChange}) => {
  const [open, setOpen] = useState(false);
  const d = new Date();

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(true)}>
          <View style={styles.form}>
            <Text style={styles.text}>{tanggal.toLocaleDateString()}</Text>
            <IcCalendar />
          </View>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        maximumDate	={d}
        mode="date"
        open={open}
        date={tanggal}
        onConfirm={itemValue => {
          setOpen(false);
          onValueChange(itemValue);
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
    marginTop: 2
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 13}
});

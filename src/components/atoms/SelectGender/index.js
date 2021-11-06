import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SelectGender = ({label, value, onSelectChange}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          style={{color: 'black'}}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => onSelectChange(itemValue)}>
          <Picker.Item label="Laki-Laki" value="Laki-Laki" />
          <Picker.Item label="Perempuan" value="Perempuan" />
        </Picker>
      </View>
    </View>
  );
};

export default SelectGender;

const styles = StyleSheet.create({
  label: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#020202'},
  input: {borderWidth: 1, borderColor: '#020202', borderRadius: 8, padding: 0}
});

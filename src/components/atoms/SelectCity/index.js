import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const SelectCity = ({label, value, onSelectChange}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          style={{color: 'black'}}
          selectedValue={value}
          onValueChange={(itemValue, itemIndex) => onSelectChange(itemValue)}>
          <Picker.Item label="Bandung" value="Bandung" />
          <Picker.Item label="Jakarta" value="Jakarta" />
          <Picker.Item label="Bali" value="Bali" />
          <Picker.Item label="Makassar" value="Makassar" />
          <Picker.Item label="Surabaya" value="Surabaya" />
        </Picker>
      </View>
    </View>
  );
};

export default SelectCity;

const styles = StyleSheet.create({
  label: {fontSize: 14, fontFamily: 'Poppins-Regular', color: '#020202'},
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    padding: 0
  }
});

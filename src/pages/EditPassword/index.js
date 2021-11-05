import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, Gap, Button} from '../../components';

const EditPassword = ({navigation}) => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <TextInput
          label="Kata Sandi Lama"
          placeholder="Masukkan kata sandi lama anda"
          // onChangeText={value => setForm('name', value)}
        />
        <Gap height={16} />
        <TextInput
          label="Kata Sandi Baru"
          placeholder="Masukkan kata sandi baru anda"
          // onChangeText={value => setForm('name', value)}
        />
        <Gap height={50} />
        <Button text="Simpan" onPress={''} />
      </View>
    </View>
  );
};

export default EditPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1
  },
  page: {flex: 1, backgroundColor: 'white'},
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center'
  }
});

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';

const SignIn = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header title="Masuk" subTitle="Jawab keraguan anda!" />
      <View style={styles.container}>
        <TextInput label="Email" placeholder="Masukkan email anda" />
        <Gap height={16} />
        <TextInput
          label="Kata Sandi"
          placeholder="Masukkan kata sandi anda"
          secureTextEntry
        />
        <Gap height={24} />
        <Button text="Masuk" onPress={() => {}} />
        <Gap height={12} />
        <Button
          text="Daftar"
          color="#8F9AD8"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1
  },
  page: {flex: 1, backgroundColor: 'white'}
});

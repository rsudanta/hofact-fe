import React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Button, Gap, Header, TextInput } from '../../components';
import { signInAction } from '../../redux/action';
import { useForm } from '../../utils';

const SignIn = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [iconName, setIconName] = useState('showPassword');
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(signInAction(form, navigation));
  };

  return (
    <View style={styles.page}>
      <Header title="Masuk" subTitle="Jawab keraguan anda!" />
      <View style={styles.container}>
        <TextInput
          label="Email"
          placeholder="Masukkan email anda"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={16} />
        <TextInput
          icon={iconName}
          show={() => {
            setShowPassword(false);
            setIconName('hidePassword')
          }}
          hide={() => {
            setShowPassword(true);
            setIconName('showPassword')
          }}
          label="Kata Sandi"
          placeholder="Masukkan kata sandi anda"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry={showPassword}
        />
        <Gap height={24} />
        <Button text="Masuk" onPress={onSubmit} />
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
    flex: 1,
  },
  page: { flex: 1, backgroundColor: 'white' },
});

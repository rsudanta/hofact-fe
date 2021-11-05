import axios from 'axios';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {TextInput, Gap, Button} from '../../components';
import {API_HOST} from '../../config';
import {setLoading} from '../../redux/action';
import {getData, showMessage, useForm} from '../../utils';

const EditPassword = ({navigation}) => {
  const [form, setForm] = useForm({
    current_password: '',
    password: '',
    password_confirmation: ''
  });

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(setLoading(true));
    getData('token').then(res => {
      axios
        .post(`${API_HOST.url}/user/password`, form, {
          headers: {
            Authorization: res.value,
          },
        })
        .then(resPass => {
          dispatch(setLoading(false));
          navigation.navigate('Profile');
          showMessage('Kata sandi berhasil diganti', 'success');
        })
        .catch(err => {
          console.log('error update password', err);
          dispatch(setLoading(false));
          showMessage('Kata sandi gagal diganti');
        });
    });
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <TextInput
          label="Kata Sandi Lama"
          placeholder="Masukkan kata sandi lama anda"
          value={form.current_password}
          onChangeText={value => setForm('current_password', value)}
          secureTextEntry
        />
        <Gap height={16} />
        <TextInput
          label="Kata Sandi Baru"
          placeholder="Masukkan kata sandi baru anda"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={16} />
        <TextInput
          label="Konfirmasi Kata Sandi Baru"
          placeholder="Masukkan kata sandi baru anda"
          value={form.password_confirmation}
          onChangeText={value => setForm('password_confirmation', value)}
          secureTextEntry
        />
        <Gap height={50} />
        <Button text="Simpan" onPress={onSubmit} />
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

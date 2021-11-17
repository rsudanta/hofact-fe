import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  DateSelector,
  Gap,
  Header,
  SelectCity,
  SelectGender
} from '../../components';
import {setLoading, signUpAction} from '../../redux/action';
import {useForm} from '../../utils';

const SignUpProfile = ({navigation}) => {
  const [date, setDate] = useState(new Date());

  const [form, setForm] = useForm({
    tanggal_lahir: date.toISOString().slice(0, 19).replace('T', ' '),
    jenis_kelamin: 'Laki-laki',
    kota_asal: 'Bandung',
  });

  const {registerReducer, photoReducer} = useSelector(state => state);

  const dispatch = useDispatch();

  const onSubmit = () => {
    console.log('form:', form);
    const data = {
      ...form,
      ...registerReducer
    };
    console.log('data register :', data);
    dispatch(setLoading(true));
    dispatch(signUpAction(data, photoReducer, navigation));
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.page}>
        <Header
          title="Profil"
          subTitle="Pastikan data anda benar"
          onBack={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.container}>
          <DateSelector
            label="Tanggal Lahir"
            tanggal={date}
            onValueChange={value => {
              setDate(value);
              setForm(
                'tanggal_lahir',
                value.toISOString().slice(0, 19).replace('T', ' ')
              );
            }}
          />
          <Gap height={16} />
          <SelectGender
            label="Jenis Kelamin"
            value={form.jenis_kelamin}
            onSelectChange={value => setForm('jenis_kelamin', value)}
          />
          <Gap height={16} />
          <SelectCity
            label="Kota Asal"
            value={form.kota_asal}
            onSelectChange={value => setForm('kota_asal', value)}
          />
          <Gap height={24} />
          <Button text="Daftar" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  page: {flex: 1, backgroundColor: 'white'},
});

import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  DateSelector,
  Gap,
  Header,
  SelectCity,
  SelectGender,
} from '../../components';

const SignUpProfile = ({navigation}) => {
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
          <DateSelector label="Tanggal Lahir" />
          <Gap height={16} />
          <SelectGender label="Jenis Kelamin" />
          <Gap height={16} />
          <SelectCity label="Kota Asal" />
          <Gap height={24} />
          <Button
            text="Daftar"
            onPress={() => {
              navigation.replace('MainApp');
            }}
          />
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

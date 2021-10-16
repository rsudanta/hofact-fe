import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';

const SignUp = ({navigation}) => {
  return (
    <ScrollView style={styles.page}>
      <View>
        <Header
          title="Daftar"
          subTitle="Daftar dan mulai berdiskusi"
          onBack={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.container}>
          <View style={styles.photo}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.borderPhoto}>
                <View style={styles.photoContainer}>
                  <Text style={styles.addPhoto}>Pilih Foto</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <TextInput
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap anda"
          />
          <Gap height={16} />
          <TextInput label="Email" placeholder="Masukkan email anda" />
          <Gap height={16} />
          <TextInput
            label="Kata Sandi"
            placeholder="Masukkan kata sandi anda"
            secureTextEntry
          />
          <Gap height={24} />
          <Button
            text="Lanjutkan"
            onPress={() => {
              navigation.navigate('SignUpProfile');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
  page: {flex: 1, backgroundColor: 'white'},
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    padding: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {alignItems: 'center', marginBottom: 16},
});

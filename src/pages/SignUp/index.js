import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Gap, Header, TextInput } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { showMessage, useForm } from '../../utils';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import validator from 'validator';


const SignUp = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [iconName, setIconName] = useState('showPassword');
  const [form, setForm] = useForm({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();

  const [photo, setPhoto] = useState('');

  const addPhoto = () => {
    launchImageLibrary(
      {
        quality: 0.7,
        maxWidth: 200,
        maxHeight: 200,
      },
      res => {
        console.log('Response photo = ', res);

        if (res.didCancel || res.error) {
          showMessage('Anda tidak memilih foto');
        } else {
          const source = {
            uri: res.assets[0].uri
          };
          const dataImage = {
            uri: res.assets[0].uri,
            type: res.assets[0].type,
            name: res.assets[0].fileName
          };

          setPhoto(source);

          dispatch({ type: 'SET_PHOTO', value: dataImage });
          dispatch({ type: 'SET_UPLOAD_STATUS', value: true });
        }
      }
    );
  };

  const onSubmit = () => {
    if (validator.isEmpty(form.name)) {
      showMessage('Nama lengkap harus diisi');
    } else if (validator.isEmpty(form.email)) {
      showMessage('Email harus diisi');
    } else if (!validator.isEmail(form.email)) {
      showMessage('Format email tidak tepat');
    } else if (validator.isEmpty(form.password)) {
      showMessage('Password harus diisi');
    } else if (!validator.isLength(form.password, { min: 8, max: undefined })) {
      showMessage('Password minimal 8 karakter');
    } else {
      dispatch({ type: 'SET_REGISTER', value: form });
      navigation.navigate('SignUpProfile');
    }
  };

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
            <TouchableOpacity onPress={addPhoto}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  <Image source={photo} style={styles.photoContainer} />
                ) : (
                  <View style={styles.photoContainer}>
                    <Text style={styles.addPhoto}>Pilih Foto</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <TextInput
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap anda"
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <Gap height={16} />
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
            secureTextEntry={showPassword}
            value={form.password}
            onChangeText={value => setForm('password', value)}
          />
          <Gap height={24} />
          <Button text="Lanjutkan" onPress={onSubmit} />
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
    flex: 1
  },
  page: { flex: 1, backgroundColor: 'white' },
  addPhoto: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
    textAlign: 'center'
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    padding: 24,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: { alignItems: 'center', marginBottom: 16 }
});

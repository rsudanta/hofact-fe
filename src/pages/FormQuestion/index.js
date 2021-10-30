import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Gap,
  Header,
  ImagePicker,
  TextArea,
  TextInput,
} from '../../components';
import {questionAction} from '../../redux/action';
import {getData, showMessage, useForm} from '../../utils';

const FormQuestion = ({navigation}) => {
  const [form, setForm] = useForm({
    judul_pertanyaan: '',
    isi_pertanyaan: '',
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    getData('token').then(res => {
      setToken(res.value);
    });
  });

  const dispatch = useDispatch();

  const [photo, setPhoto] = useState('');
  const [dataPhoto, setDataPhoto] = useState({});
  const [isUploadPhoto, setIsUploadPhoto] = useState(false);

  const addPhoto = () => {
    launchImageLibrary(
      {
        quality: 0.7
      },
      res => {
        console.log('Response photo = ', res);

        if (res.didCancel || res.error) {
          showMessage('Anda tidak memilih foto');
        } else {
          const source = {uri: res.assets[0].uri};
          const dataImage = {
            uri: res.assets[0].uri,
            type: res.assets[0].type,
            name: res.assets[0].fileName,
          };

          setPhoto(source);
          setDataPhoto(dataImage);
          setIsUploadPhoto(true);
        }
      }
    );
  };

  const onSubmit = () => {
    dispatch(questionAction(form, token, navigation, dataPhoto, isUploadPhoto));
  };

  return (
    <ScrollView style={styles.page}>
      <View>
        <Header
          title="Pertanyaan"
          subTitle="Mulai Bertanya"
          onBack={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.container}>
          <TextInput
            label="Judul Pertanyaan"
            placeholder="Masukkan judul pertanyaan"
            value={form.judul_pertanyaan}
            onChangeText={value => setForm('judul_pertanyaan', value)}
          />
          <Gap height={20} />
          <TextArea
            label="Deskripsi Pertanyaan"
            placeholder="Deskripsikan pertanyaanmu"
            value={form.isi_pertanyaan}
            onChangeText={value => setForm('isi_pertanyaan', value)}
          />
          <Gap height={20} />
          <View style={styles.imagePickContainer}>
            <ImagePicker label="Gambar" onPress={addPhoto} />
            {photo ? (
              <Image source={photo} style={styles.photoContainer} />
            ) : (
              <></>
            )}
          </View>
          <Gap height={50} />
          <Button text="Kirim" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default FormQuestion;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1
  },
  photoContainer: {
    marginTop: 23,
    marginLeft: 18,
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  imagePickContainer: {
    flexDirection: 'row'
  },
});

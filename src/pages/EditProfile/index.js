import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, TextInput} from '../../components';
import {API_HOST} from '../../config';
import {getProfileData, setLoading} from '../../redux/action';
import {getData, showMessage, useForm} from '../../utils';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.profileReducer);

  useEffect(() => {
    dispatch(getProfileData());
    setPhoto(
      profile.photo_path == null
        ? profile.profile_photo_url
        : `https://hofact.masuk.id/storage/public/${profile.photo_path}`
    );
  }, []);

  const [form, setForm] = useForm({
    name: profile.name
  });
  const [photo, setPhoto] = useState('');
  const [imageData, setImageData] = useState({});
  const [uploadStatus, setUploadStatus] = useState(false);

  const addPhoto = () => {
    launchImageLibrary(
      {
        quality: 0.7,
        maxWidth: 200,
        maxHeight: 200
      },
      res => {
        console.log('Response photo = ', res);

        if (res.didCancel || res.error) {
          showMessage('Anda tidak memilih foto');
        } else {
          const source = res.assets[0].uri;
          const dataImage = {
            uri: res.assets[0].uri,
            type: res.assets[0].type,
            name: res.assets[0].fileName,
          };

          setPhoto(source);
          setImageData(dataImage);
          setUploadStatus(true);
        }
      }
    );
  };

  const onSubmit = () => {
    dispatch(setLoading(true));
    getData('token').then(res => {
      axios
        .post(`${API_HOST.url}/user`, form, {
          headers: {
            Authorization: res.value,
          },
        })
        .then(resEdit => {
          if (uploadStatus) {
            const dataPhoto = new FormData();
            dataPhoto.append('file', imageData);
            axios
              .post(`${API_HOST.url}/user/photo`, dataPhoto, {
                headers: {
                  Authorization: res.value,
                  'Content-Type': 'multipart/form-data',
                }
              })
              .then(resUpload => {
                profile.profile_photo_url = `https://hofact.masuk.id/storage/public/${resUpload.data.data[0]}`;
                navigation.navigate('Profile');
              })
              .catch(err => {
                showMessage('Upload foto tidak berhasil');
                navigation.navigate('Profile');
              });
          }
          dispatch(setLoading(false));
          navigation.navigate('Profile');
          showMessage('Data berhasil diganti', 'success');
        })
        .catch(err => {
          console.log('err edit', err);
          dispatch(setLoading(false));
          showMessage('Data gagal diganti');
        });
    });
  };

  return (
    <ScrollView style={styles.page}>
      <View>
        <View style={styles.container}>
          <View style={styles.photo}>
            <TouchableOpacity onPress={addPhoto}>
              <View style={styles.borderPhoto}>
                {photo ? (
                  <Image source={{uri: photo}} style={styles.photoContainer} />
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
          <Gap height={50} />
          <Button text="Simpan" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

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
  photo: {alignItems: 'center', marginBottom: 16}
});

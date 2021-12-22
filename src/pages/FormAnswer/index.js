import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {IcAttach, IcDelete, IcSend} from '../../assets';
import {HeaderLogo, Post} from '../../components';
import {answerAction} from '../../redux/action';
import {getData, showMessage, useForm} from '../../utils';

const FormAnswer = ({navigation, route}) => {
  const item = ({
    id,
    judul_pertanyaan,
    isi_pertanyaan,
    user,
    created_at,
    isi_jawaban,
    jawaban,
    gambar_url
  } = route.params);

  const [photo, setPhoto] = useState(null);
  const [dataPhoto, setDataPhoto] = useState({});
  const [isUploadPhoto, setIsUploadPhoto] = useState(false);
  const [form, setForm] = useForm({
    isi_jawaban: '',
    id_pertanyaan: item.id,
  });

  const [token, setToken] = useState('');

  useEffect(() => {
    getData('token').then(res => {
      setToken(res.value);
    });
  }, []);

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

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(answerAction(form, token, navigation, dataPhoto, isUploadPhoto));
  };

  const onDelete = () => {
    setPhoto(null);
    setDataPhoto({});
    setIsUploadPhoto(false);
  };

  return (
    <View style={styles.page}>
      <HeaderLogo
        onBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Post
          detailPost
          isQuestion
          image={
            item.user.photo_path == null
              ? item.user.profile_photo_url
              : `https://hofact.masuk.id/storage/public/${item.user.photo_path}`
          }
          name={item.user.name}
          badge={item.user.poin}
          role={item.user.role}
          title={item.judul_pertanyaan}
          question={item.isi_pertanyaan}
          date={item.created_at}
          imageQuestion={item.gambar_url}
        />
        {photo && (
          <View>
            <Image source={photo} style={styles.image} resizeMode="cover" />
            <View style={styles.deletePhoto}>
              <TouchableOpacity activeOpacity={0.7} onPress={onDelete}>
                <IcDelete />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#8D92A3"
            placeholder="Tulis jawaban anda disini"
            style={styles.input}
            multiline={true}
            value={form.isi_jawaban}
            onChangeText={value => setForm('isi_jawaban', value)}
          />
        </View>
      </ScrollView>
      <View style={styles.button}>
        <TouchableOpacity onPress={addPhoto}>
          <IcAttach />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSubmit}>
          <IcSend style={styles.ic} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormAnswer;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white'
  },
  jawaban: {
    paddingLeft: 24,
    paddingBottom: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black'
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: '#C4C4C4',
    color: 'white',
    justifyContent: 'flex-end',
  },
  input: {
    paddingHorizontal: 24,
    backgroundColor: 'white',
    height: '100%',
    textAlignVertical: 'top',
    color: 'black',
  },
  ic: {
    marginLeft: 16,
  },
  image: {width: '100%', height: 200},
  deletePhoto: {
    position: 'absolute',
    margin: 10,
    right: 0,
  },
});

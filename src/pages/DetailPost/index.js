import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, EmptyAnswer, Gap, HeaderLogo, Post} from '../../components';
import {API_HOST} from '../../config';
import {getData} from '../../utils';

const DetailPost = ({navigation, route}) => {
  const item = ({
    id,
    judul_pertanyaan,
    isi_pertanyaan,
    user,
    created_at,
    isi_jawaban,
    jawaban,
    gambar_url,
  } = route.params);

  const [listJawaban, setListJawaban] = useState([]);
  const [authID, setAuthID] = useState('');

  useEffect(() => {
    getData('userProfile').then(res => {
      setAuthID(res.id);
    });
    axios
      .get(`${API_HOST.url}/jawaban?id_pertanyaan=${item.id}`)
      .then(res => {
        setListJawaban(res.data.data.data);
      })
      .catch($e => {
        console.log('err get jawaban', $e);
      });
  }, []);

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
          image={{uri: item.user.profile_photo_url}}
          name={item.user.name}
          badge={item.user.poin}
          title={item.judul_pertanyaan}
          question={item.isi_pertanyaan}
          date={item.created_at}
          imageQuestion={item.gambar_url}
        />
        <Text style={styles.jawaban}>JAWABAN</Text>
        <View>
          {item.isi_jawaban.length > 0 ? (
            listJawaban.map(itemJawaban => {
              return (
                <Post
                  detailPost
                  verify={itemJawaban.is_terverifikasi}
                  name={itemJawaban.user.name}
                  image={{uri: itemJawaban.user.profile_photo_url}}
                  badge={itemJawaban.user.poin}
                  isAnswer
                  date={itemJawaban.created_at}
                  point={itemJawaban.vote}
                  key={itemJawaban.id}
                  answer={itemJawaban.isi_jawaban}
                />
              );
            })
          ) : (
            <EmptyAnswer text="Belum ada jawaban" />
          )}
        </View>
      </ScrollView>
      <View style={styles.button}>
        {item.user.id != authID && <Button answer text="Jawab" />}
      </View>
    </View>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F7FF'
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
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: '#C4C4C4',
    color: 'white'
  }
});

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {EmptyAnswer, Post, PostSkeleton, TextInput} from '../../components';
import {API_HOST} from '../../config';
import {setLoadPost} from '../../redux/action';

const Search = ({navigation}) => {
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(3);

  const {loadPost} = useSelector(state => state.globalReducer);

  useEffect(() => {
    dispatch(setLoadPost(true));
    axios
      .get(
        `${API_HOST.url}/pertanyaan?judul_pertanyaan=${searchInput}&limit=${limit}`
      )
      .then(res => {
        setData(res.data.data.data);
        dispatch(setLoadPost(false));
      })
      .catch($e => {
        console.log('err get search', $e);
        dispatch(setLoadPost(false));
      });
  }, [searchInput]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Pencarian</Text>
        <TextInput
          placeholder="Cari pertanyaan.."
          value={searchInput}
          onChangeText={value => {
            setSearchInput(value);
            setLimit('');
          }}
        />
      </View>
      <ScrollView>
        {loadPost ? (
          <View>
            {data.map(index => {
              return <PostSkeleton />;
            })}
          </View>
        ) : data.length == 0 ? (
          <EmptyAnswer text="Pencarian tidak ditemukan" />
        ) : (
          data.map(itemData => {
            return (
              <Post
                isQuestion
                key={itemData.id}
                name={itemData.user.name}
                badge={itemData.user.poin}
                title={itemData.judul_pertanyaan}
                question={itemData.isi_pertanyaan}
                verify={itemData.is_terverifikasi}
                date={itemData.created_at}
                totalAnswer={itemData.isi_jawaban}
                image={
                  itemData.user.photo_path == null
                    ? itemData.user.profile_photo_url
                    : `https://hofact.masuk.id/storage/public/${itemData.user.photo_path}`
                }
                comment
                onPress={() => {
                  navigation.navigate('DetailPost', itemData);
                  setSearchInput('');
                }}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24
  },
  title: {fontFamily: 'Poppins-Medium', fontSize: 22, color: '#020202'}
});

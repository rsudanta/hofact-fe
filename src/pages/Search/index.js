import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyAnswer, Post, PostSkeleton, TextInput } from '../../components';
import { API_HOST } from '../../config';
import { getSearchPostData, setLoadPost } from '../../redux/action';

const Search = ({ navigation }) => {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(3);

  const { loadPost } = useSelector(state => state.globalReducer);
  const { searchPost } = useSelector(state => state.postReducer);

  useEffect(() => {
    dispatch(getSearchPostData(searchInput, limit));
  }, []);

  const handleSearch = () => {
    const search = searchInput.replace(/^\s+/, '').replace(/\s+$/, '');
    if(search!= ''){
      dispatch(setLoadPost(true));
      setLimit('');
      dispatch(getSearchPostData(searchInput, limit))
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Pencarian</Text>
        <View style={styles.search}>
          <TextInput
            placeholder="Cari pertanyaan.."
            value={searchInput}
            onChangeText={value => {
              setSearchInput(value);
            }}
            onSubmitEditing={() => {
              handleSearch()
            }}

          />
          <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7} onPress={() => {
            handleSearch();
            Keyboard.dismiss();
          }}>
            <Text style={styles.searchText}>Cari</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {loadPost ? (
          <PostSkeleton />
        ) : searchPost.length > 0 ? (
          searchPost.map(itemData => {
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
        ) : (
          searchPost.length == 0 && (
            <EmptyAnswer text="Pencarian tidak ditemukan" />
          )
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
  title: { fontFamily: 'Poppins-Medium', fontSize: 22, color: '#020202' },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchBtn: {
    justifyContent: 'center',
    flex: 1,
  },
  searchText: {
    fontFamily: 'Poppins-Medium', fontSize: 16, color: '#1D2D8C',
  }

});

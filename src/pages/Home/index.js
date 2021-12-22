import { useScrollToTop } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Gap,
  HomeHeader,
  Post,
  PostSkeleton,
  RoundButton
} from '../../components';
import { API_HOST } from '../../config';
import {
  getProfileData, setLoadPost,
  setRefreshing
} from '../../redux/action';
import { getData } from '../../utils';

const Home = ({ navigation }) => {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profileReducer);
  const { refreshing, loadPost } = useSelector(state => state.globalReducer);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(undefined);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    axios
      .get(`${API_HOST.url}/pertanyaan?page=${page}`)
      .then(res => {
        setMaxPage(res.data.data.last_page)
        page === 1 ?
          (setData(res.data.data.data)) :
          (setData([...data, ...res.data.data.data]))
        dispatch(setRefreshing(false));
        dispatch(setLoadPost(false));
        setIsLoading(false);
      })
      .catch(err => {
        console.log('err get post: ', err);
      });
  }

  const handleLoadMore = () => {
    if (page <= maxPage) {
      setLoadingMore(true);
      setPage(page + 1);
      fetchData();
    }
    if (page == maxPage + 1) {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    getData('userProfile').then(resProfile => {
      dispatch({ type: 'SET_AUTH_ID', value: resProfile.id });
    });
    setIsLoading(true)
    dispatch(setLoadPost(true));
    dispatch(getProfileData());
    fetchData();
  }, []);

  const onRefresh = React.useCallback(() => {
    setPage(1);
    dispatch(setLoadPost(true));
    dispatch(setRefreshing(true));
    fetchData();
    dispatch(getProfileData());
  }, []);

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View
        style={{
          alignItems: 'center',
          marginVertical: 10
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  if (isLoading) {
    return <View>
      <HomeHeader
        title="Beranda"
        subTitle="Temukan jawabanmu!"
        poin={profile.poin}
        image={
          profile.photo_path == null
            ? profile.profile_photo_url
            : `https://hofact.masuk.id/storage/public/${profile.photo_path}`
        }
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
      <Gap height={20} />
      <View>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </View>
    </View>
  }

  return (
    <>
      <FlatList
        ref={ref}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() =>
          <View>
            <HomeHeader
              title="Beranda"
              subTitle="Temukan jawabanmu!"
              poin={profile.poin}
              image={
                profile.photo_path == null
                  ? profile.profile_photo_url
                  : `https://hofact.masuk.id/storage/public/${profile.photo_path}`
              }
              onPress={() => {
                navigation.navigate('Profile');
              }}
            />
            <Gap height={20} />

          </View>
        }
        ListFooterComponent={renderFooter}
        data={data}
        renderItem={({ item }) => (
          loadPost ? (
            <View>
              <PostSkeleton />
            </View>
          ) : (
            <Post
              key={item.id}
              name={item.user.name}
              badge={item.user.poin}
              role={item.user.role}
              title={item.judul_pertanyaan}
              question={item.isi_pertanyaan}
              verify={item.is_terverifikasi}
              date={item.created_at}
              totalAnswer={item.isi_jawaban}
              image={
                item.user.photo_path == null
                  ? item.user.profile_photo_url
                  : `https://hofact.masuk.id/storage/public/${item.user.photo_path}`
              }
              comment
              onPress={() => {
                navigation.navigate('DetailPost', item);
              }}
            />)
        )}
        onEndReachedThreshold={0.1}
        onEndReached={handleLoadMore}
      >
      </FlatList>
      <RoundButton
        style={styles.button}
        onPress={() => {
          navigation.navigate('FormQuestion');
        }}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
});

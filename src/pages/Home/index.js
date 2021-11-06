import {useScrollToTop} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  EmptyAnswer,
  Gap,
  HomeHeader,
  Post,
  PostSkeleton,
  RoundButton
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPostData,
  getProfileData,
  setLoading,
  setLoadPost
} from '../../redux/action';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const dispatch = useDispatch();
  const {post} = useSelector(state => state.homeReducer);
  const {profile} = useSelector(state => state.profileReducer);
  const {refreshing, loadPost} = useSelector(state => state.globalReducer);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getPostData());
      dispatch(getProfileData());
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    dispatch(getPostData());
    dispatch(getProfileData());
  }, []);

  return (
    <>
      <ScrollView
        ref={ref}
        style={styles.page}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
        <View style={styles.page}>
          <Gap height={20} />
          {loadPost ? (
            <View>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </View>
          ) : post.length == 0 ? (
            <EmptyAnswer text="Tidak ada data" />
          ) : (
            post.map(itemPost => {
              return (
                <Post
                  key={itemPost.id}
                  name={itemPost.user.name}
                  badge={itemPost.user.poin}
                  title={itemPost.judul_pertanyaan}
                  question={itemPost.isi_pertanyaan}
                  verify={itemPost.is_terverifikasi}
                  date={itemPost.created_at}
                  totalAnswer={itemPost.isi_jawaban}
                  image={
                    itemPost.user.photo_path == null
                      ? itemPost.user.profile_photo_url
                      : `https://hofact.masuk.id/storage/public/${itemPost.user.photo_path}`
                  }
                  comment
                  onPress={() => {
                    navigation.navigate('DetailPost', itemPost);
                  }}
                />
              );
            })
          )}
        </View>
      </ScrollView>
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

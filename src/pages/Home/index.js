import {useScrollToTop} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  EmptyAnswer,
  Gap,
  HomeHeader,
  Post,
  RoundButton
} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getPostData, setLoading} from '../../redux/action';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const dispatch = useDispatch();
  const {post} = useSelector(state => state.homeReducer);
  const {refreshing} = useSelector(state => state.globalReducer);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getPostData());
    }, [])
  );
  // useEffect(() => {
  //   dispatch(getPostData());
  // },[]);

  const onRefresh = React.useCallback(() => {
    dispatch(getPostData());
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
        <HomeHeader title="Beranda" subTitle="Temukan jawabanmu!" />
        <View style={styles.page}>
          <Gap height={20} />
          {post.length == 0 ? (
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
                  image={{uri: itemPost.user.profile_photo_url}}
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

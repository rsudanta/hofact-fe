import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  EmptyAnswer,
  Gap,
  HeaderLogo,
  Post,
  PostSkeleton
} from '../../components';
import { API_HOST } from '../../config';
import {
  getAnswerData,
  getVoteData,
  setLoadPost,
  getPostData,
  setRefreshing,
} from '../../redux/action';
import { getData, showMessage } from '../../utils';

const DetailPost = ({ navigation, route }) => {
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

  const [hasAnswer, setHasAnswer] = useState(true);
  const [voting, setVoting] = useState('');
  const [token, setToken] = useState('');
  const { answer, vote } = useSelector(state => state.detailReducer);
  const { authID, refreshing, loadPost } = useSelector(state => state.globalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadPost(true));
    dispatch(getAnswerData(item.id));
    getData('token').then(resToken => {
      setToken(resToken.value);
    });
    dispatch(getVoteData());
    axios
      .get(`${API_HOST.url}/jawaban?id_pertanyaan=${item.id}`)
      .then(res => {
        for (var i = 0; i < res.data.data.data.length; i++) {
          let result = res.data.data.data[i].id_user.includes(authID);
          if (result == true) {
            setHasAnswer(true);
            break;
          }
          else {
            setHasAnswer(false);
          }
        }
      })
      .catch($e => {
        console.log('err get jawaban', $e);
      });
  }, [voting]);

  const onRefresh = React.useCallback(() => {
    dispatch(setRefreshing(true));
    dispatch(setLoadPost(true));
    dispatch(getAnswerData(item.id));
  }, []);

  const onUpvote = idJawaban => {
    axios
      .post(`${API_HOST.url}/upvote/${idJawaban}`, null, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        setVoting(res.data.data.id);
      })
      .catch(err => {
        showMessage('Anda sudah memberikan upvote');
      });
  };

  const onDownvote = idJawaban => {
    axios
      .post(`${API_HOST.url}/downvote/${idJawaban}`, null, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        setVoting(res.data.data.id);
      })
      .catch(err => {
        showMessage('Anda sudah memberikan downvote');
      });
  };

  const findVote = item => {
    var result = vote.find(({ id_jawaban }) => id_jawaban == item);
    return result;
  };

  return (
    <View style={styles.page}>
      <HeaderLogo
        onBack={() => {
          dispatch({ type: 'SET_ANSWER', value: [] });
          dispatch(getPostData());
          navigation.goBack();
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
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
        <Text style={styles.jawaban}>JAWABAN</Text>
        <View>
          {item.isi_jawaban.length == 0 ? (
            <View>
              <EmptyAnswer text="Belum ada jawaban" />
              <Gap height={50} />
            </View>
          ) : loadPost ? (
            <View>
              {item.isi_jawaban.map(item => {
                return <PostSkeleton key={item.id} />;
              })}
            </View>
          ) : (
            item.isi_jawaban.length > 0 &&
            answer.map(itemJawaban => {
              return (
                <Post
                  detailPost
                  verify={itemJawaban.is_terverifikasi}
                  name={itemJawaban.user.name}
                  image={
                    itemJawaban.user.photo_path == null
                      ? itemJawaban.user.profile_photo_url
                      : `https://hofact.masuk.id/storage/public/${itemJawaban.user.photo_path}`
                  }
                  badge={itemJawaban.user.poin}
                  role={itemJawaban.user.role}
                  isAnswer
                  voteAuth={authID == itemJawaban.user.id ? true : false}
                  date={itemJawaban.created_at}
                  point={itemJawaban.total_vote}
                  key={itemJawaban.id}
                  answer={itemJawaban.isi_jawaban}
                  onUpvote={() => {
                    onUpvote(itemJawaban.id);
                  }}
                  onDownvote={() => {
                    onDownvote(itemJawaban.id);
                  }}
                  hasVote={
                    findVote(itemJawaban.id)
                      ? findVote(itemJawaban.id).status
                      : null
                  }
                  imageAnswer={itemJawaban.gambar_url}
                />
              );
            })
          )}
        </View>
      </ScrollView>

      {item.user.id == authID ? (
        <></>
      ) : item.isi_jawaban.length == 0 ? (
        <View style={styles.button}>
          <Button
            answer
            text="Jawab"
            onPress={() => {
              navigation.replace('FormAnswer', item);
            }}
          />
        </View>
      ) : (
        hasAnswer == false && (
          <View style={styles.button}>
            <Button
              answer
              text="Jawab"
              onPress={() => {
                navigation.replace('FormAnswer', item);
              }}
            />
          </View>
        )
      )}
    </View>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  jawaban: {
    paddingLeft: 24,
    paddingBottom: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: '#C4C4C4',
    color: 'white',
  },
});

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  EmptyAnswer,
  Gap,
  HeaderLogo,
  Post,
  PostSkeleton,
} from '../../components';
import {API_HOST} from '../../config';
import {getAnswerData, getVoteData, setRefreshing} from '../../redux/action';
import {getData, showMessage} from '../../utils';

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

  const [authID, setAuthID] = useState('');
  const [hasAnswer, setHasAnswer] = useState(false);
  const [voting, setVoting] = useState('');
  const [token, setToken] = useState('');
  const {answer, vote} = useSelector(state => state.detailReducer);
  const {refreshing, loadPost} = useSelector(state => state.globalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getData('userProfile').then(resProfile => {
      setAuthID(resProfile.id);
    });
    getData('token').then(resToken => {
      setToken(resToken.value);
    });
    dispatch(getVoteData());
    dispatch(getAnswerData(item.id));
  }, [voting]);

  const onRefresh = React.useCallback(() => {
    dispatch(setRefreshing(true));
    dispatch(getAnswerData(item.id));
  }, []);

  const onUpvote = idJawaban => {
    axios
      .post(`${API_HOST.url}/upvote/${idJawaban}`, null, {
        headers: {
          Authorization: token,
        },
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
          Authorization: token,
        },
      })
      .then(res => {
        setVoting(res.data.data.id);
      })
      .catch(err => {
        showMessage('Anda sudah memberikan downvote');
      });
  };

  const findVote = item => {
    var result = vote.find(({id_jawaban}) => id_jawaban == item);
    return result;
  };

  return (
    <View style={styles.page}>
      <HeaderLogo
        onBack={() => {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
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
          title={item.judul_pertanyaan}
          question={item.isi_pertanyaan}
          date={item.created_at}
          imageQuestion={item.gambar_url}
        />
        <Text style={styles.jawaban}>JAWABAN</Text>
        <View>
          {loadPost ? (
            <View>
              {item.isi_jawaban.map(item => {
                return <PostSkeleton />;
              })}
            </View>
          ) : item.isi_jawaban.length > 0 ? (
            answer.map(itemJawaban => {
              {
                if (itemJawaban.id_user == authID && hasAnswer == false) {
                  setHasAnswer(true);
                }
              }
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
          ) : (
            <View>
              <EmptyAnswer text="Belum ada jawaban" />
              <Gap height={50} />
            </View>
          )}
        </View>
      </ScrollView>
      {item.user.id != authID && hasAnswer == false && (
        <View style={styles.button}>
          <Button
            answer
            text="Jawab"
            onPress={() => {
              navigation.navigate('FormAnswer', item);
            }}
          />
        </View>
      )}
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

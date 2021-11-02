import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, EmptyAnswer, Gap, HeaderLogo, Post} from '../../components';
import {API_HOST} from '../../config';
import {getAnswerData} from '../../redux/action/detail';
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
    gambar_url
  } = route.params);

  const [listJawaban, setListJawaban] = useState([]);
  const [authID, setAuthID] = useState('');
  const [vote, setVote] = useState(false);
  const [token, setToken] = useState('');
  const [listVote, setListVote] = useState([]);
  const {answer} = useSelector(state => state.detailReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getData('userProfile').then(resProfile => {
      setAuthID(resProfile.id);
      getData('token').then(resToken => {
        setToken(resToken.value);
        axios
          .get(`${API_HOST.url}/vote/${resProfile.id}`, {
            headers: {
              Authorization: resToken.value
            }
          })
          .then(resVote => {
            console.log('success', resVote.data.data);
            setListVote(resVote.data.data);
          })
          .catch(err => {
            console.log(err);
          });
      });
    });

    dispatch(getAnswerData(item.id));
  }, [vote]);

  const onUpvote = idJawaban => {
    axios
      .post(`${API_HOST.url}/upvote/${idJawaban}`, null, {
        headers: {
          Authorization: token
        }
      })
      .then(resUpvote => {
        console.log('succes upvote', resUpvote.data.data.status);
        setVote(resUpvote.data.data.id);
      })
      .catch(err => {
        showMessage('Anda sudah memberikan upvote');
      });
  };

  const onDownvote = idJawaban => {
    getData('token').then(res => {
      axios
        .post(`${API_HOST.url}/downvote/${idJawaban}`, null, {
          headers: {
            Authorization: res.value
          }
        })
        .then(resUpvote => {
          console.log('succes downvote', resUpvote.data.data.status);
          setVote(resUpvote.data.data.id);
        })
        .catch(err => {
          showMessage('Anda sudah memberikan downvote');
        });
    });
  };

  const finding = item => {
    var result = listVote.find(({id_jawaban}) => id_jawaban === item);
    // console.log('res', result.status);
    return result;
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
            answer.map(itemJawaban => {
              return (
                <Post
                  detailPost
                  verify={itemJawaban.is_terverifikasi}
                  name={itemJawaban.user.name}
                  image={{uri: itemJawaban.user.profile_photo_url}}
                  badge={itemJawaban.user.poin}
                  isAnswer
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
                    finding(itemJawaban.id)
                      ? finding(itemJawaban.id).status
                      : null
                  }
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

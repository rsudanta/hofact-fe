import axios from 'axios';
import {setLoadPost, setRefreshing} from '.';
import {API_HOST} from '../../config';
import {getData} from '../../utils';

export const getAnswerData = id => dispatch => {
  dispatch(setLoadPost(true));
  dispatch(setRefreshing(true));
  axios
    .get(`${API_HOST.url}/jawaban?id_pertanyaan=${id}`)
    .then(res => {
      dispatch({type: 'SET_ANSWER', value: res.data.data.data});
      dispatch(setRefreshing(false));
      dispatch(setLoadPost(false));
    })
    .catch($e => {
      console.log('err get jawaban', $e);
      dispatch(setRefreshing(false));
      dispatch(setLoadPost(false));
    });
};

export const getVoteData = () => dispatch => {
  getData('token').then(resToken => {
    getData('userProfile').then(resUser => {
      axios
        .get(`${API_HOST.url}/vote/${resUser.id}`, {
          headers: {
            Authorization: resToken.value
          }
        })
        .then(res => {
          dispatch({type: 'SET_VOTE', value: res.data.data});
        })
        .catch(err => {
          console.log('error get vote', err);
        });
    });
  });
};

import axios from 'axios';
import {API_HOST} from '../../config';
import {getData} from '../../utils';

export const getAnswerData = id => dispatch => {
  axios
    .get(`${API_HOST.url}/jawaban?id_pertanyaan=${id}`)
    .then(res => {
      dispatch({type: 'SET_ANSWER', value: res.data.data.data});
    })
    .catch($e => {
      console.log('err get jawaban', $e);
    });
};
export const getVoteData = () => dispatch => {
  getData('token').then(resToken => {
    getData('userProfile').then(resUser => {
      axios
        .get(`${API_HOST.url}/vote/${resUser.id}`, {
          headers: {
            Authorization: resToken.value,
          },
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

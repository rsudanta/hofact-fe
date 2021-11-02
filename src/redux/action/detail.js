import axios from 'axios';
import {API_HOST} from '../../config';

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

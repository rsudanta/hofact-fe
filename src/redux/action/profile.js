import axios from 'axios';
import {API_HOST} from '../../config';
import {getData} from '../../utils';

export const getProfileData = () => dispatch => {
  getData('token').then(res => {
    axios
      .get(`${API_HOST.url}/user`, {
        headers: {
          Authorization: res.value,
        }
      })
      .then(res => {
        dispatch({type: 'SET_PROFILE', value: res.data.data});
      })
      .catch(err => {
        console.log('error get profile: ', err);
      });
  });
};

export const getUserPostData = () => dispatch => {
  getData('userProfile').then(res => {
    axios
      .get(`${API_HOST.url}/pertanyaan?id_user=${res.id}`)
      .then(resPost => {
        dispatch({type: 'SET_POST_USER', value: resPost.data.data.data});
      })
      .catch(err => {
        console.log('err get user post: ', err);
      });
  });
};

export const getUserAnswerData = () => dispatch => {
  getData('userProfile').then(res => {
    axios
      .get(`${API_HOST.url}/jawaban?id_user=${res.id}`)
      .then(resAnswer => {
        dispatch({type: 'SET_ANSWER_USER', value: resAnswer.data.data.data});
      })
      .catch(err => {
        console.log('err get user post: ', err);
      });
  });
};

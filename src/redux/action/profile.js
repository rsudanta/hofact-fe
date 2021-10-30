import axios from 'axios';
import {API_HOST} from '../../config';

export const getProfileData = token => dispatch => {
  axios
    .get(`${API_HOST.url}/user`, {
      headers: {
        Authorization: token
      },
    })
    .then(res => {
      dispatch({type: 'SET_PROFILE', value: res.data.data.data});
    })
    .catch(err => {
      console.log('err: ', err);
    });
};

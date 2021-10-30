import axios from 'axios';
import {setRefreshing} from '.';
import {API_HOST} from '../../config';

export const getPostData = () => dispatch => {
  dispatch(setRefreshing(true));
  axios
    .get(`${API_HOST.url}/pertanyaan`)
    .then(res => {
      dispatch({type: 'SET_POST', value: res.data.data.data});
      dispatch(setRefreshing(false));
    })
    .catch(err => {
      console.log('err: ', err);
      dispatch(setRefreshing(false));
    });
};

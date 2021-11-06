import axios from 'axios';
import {setLoadPost, setRefreshing} from '.';
import {API_HOST} from '../../config';

export const getPostData = () => dispatch => {
  dispatch(setLoadPost(true));

  axios
    .get(`${API_HOST.url}/pertanyaan`)
    .then(res => {
      dispatch({type: 'SET_POST', value: res.data.data.data});
      dispatch(setRefreshing(false));
      dispatch(setLoadPost(false));
    })
    .catch(err => {
      console.log('err get post: ', err);
      dispatch(setRefreshing(false));
      dispatch(setLoadPost(true));
    });
};

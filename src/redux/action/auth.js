import axios from 'axios';
import {setLoading} from '.';
import {API_HOST} from '../../config';
import {showMessage, storeData} from '../../utils';

export const signUpAction = (data, photoReducer, navigation) => dispatch => {
  axios
    .post(`${API_HOST.url}/register`, data)
    .then(res => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;
      storeData('token', {value: token});

      if (photoReducer.isUploadPhoto) {
        const dataPhoto = new FormData();
        dataPhoto.append('file', photoReducer);
        axios
          .post(`${API_HOST.url}/user/photo`, dataPhoto, {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data'
            },
          })
          .then(resUpload => {
            console.log('photo_url', resUpload.data.data[0]);
            profile.profile_photo_url = `https://hofact.masuk.id/storage/public/${resUpload.data.data[0]}`;
            storeData('userProfile', profile);
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
          })
          .catch(err => {
            showMessage('Upload foto tidak berhasil');
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
          });
      } else {
        storeData('userProfile', profile);
        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      }
      dispatch(setLoading(false));
    })
    .catch(err => {
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.meta?.message);
    });
};

export const signInAction = (data, navigation) => dispatch => {
  dispatch(setLoading(true));

  axios
    .post(`${API_HOST.url}/login`, data)
    .then(res => {
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;
      dispatch(setLoading(false));
      storeData('token', {value: token});
      storeData('userProfile', profile);
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch(err => {
      dispatch(setLoading(false));
      showMessage('Email atau password salah');
    });
};

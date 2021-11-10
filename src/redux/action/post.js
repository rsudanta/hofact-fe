import axios from 'axios';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {setLoading, setRefreshing} from '.';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData} from '../../utils';

export const questionAction =
  (data, token, navigation, photoObject, isUploadPhoto) => dispatch => {
    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/pertanyaan`, data, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        if (isUploadPhoto) {
          const dataPhoto = new FormData();
          dataPhoto.append('file', photoObject);
          axios
            .post(
              `${API_HOST.url}/pertanyaan/photo/${res.data.data.id}`,
              dataPhoto,
              {
                headers: {
                  Authorization: token,
                  'Content-Type': 'multipart/form-data'
                },
              }
            )
            .then(resUpload => {
              res.data.data.gambar_url = `https://hofact.masuk.id/storage/public/${resUpload.data.data[0]}`;
              navigation.replace('DetailPost', resUpload.data.data);
            })
            .catch(err => {
              console.log('error upload', err);
              showMessage('Upload foto tidak berhasil');
              navigation.replace('DetailPost', res.data.data);
            });
        }
        dispatch(setLoading(false));
        navigation.replace('DetailPost', res.data.data);
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage(err.response.data.data.message);
      });
  };

export const answerAction =
  (data, token, navigation, photoObject, isUploadPhoto) => dispatch => {
    dispatch(setLoading(true));
    axios
      .post(`${API_HOST.url}/jawaban`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        if (isUploadPhoto) {
          const dataPhoto = new FormData();
          dataPhoto.append('file', photoObject);
          axios
            .post(
              `${API_HOST.url}/jawaban/photo/${res.data.data.id}`,
              dataPhoto,
              {
                headers: {
                  Authorization: token,
                  'Content-Type': 'multipart/form-data',
                }
              }
            )
            .then(resUpload => {
              res.data.data.gambar_url = `https://hofact.masuk.id/storage/public/${resUpload.data.data[0]}`;
              axios
                .get(
                  `http://hofact.masuk.id/api/pertanyaan?id=${res.data.data.id_pertanyaan}`
                )
                .then(resRoute => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'DetailPost', params: resRoute.data.data}]
                  });
                  dispatch(setLoading(false));
                });
            })
            .catch(err => {
              console.log('error upload', err);
              showMessage('Upload foto tidak berhasil');
              axios
                .get(
                  `http://hofact.masuk.id/api/pertanyaan?id=${res.data.data.id_pertanyaan}`
                )
                .then(resRoute => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'DetailPost', params: resRoute.data.data}],
                  });
                  dispatch(setLoading(false));
                });
            });
        }
        axios
          .get(
            `http://hofact.masuk.id/api/pertanyaan?id=${res.data.data.id_pertanyaan}`
          )
          .then(resRoute => {
            navigation.reset({
              index: 0,
              routes: [{name: 'DetailPost', params: resRoute.data.data}]
            });
            dispatch(setLoading(false));
          });
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage(err.response.data.data.message);
      });
  };

export const getDetailPostData = id => dispatch => {
  dispatch(setRefreshing(true));
  axios
    .get(`${API_HOST.url}/pertanyaan?id=${id}`)
    .then(resPost => {
      dispatch({type: 'SET_DETAIL_POST', value: resPost.data.data.data});
      dispatch(setRefreshing(false));
    })
    .catch(err => {
      console.log('err get user post: ', err);
      dispatch(setRefreshing(true));
    });
};

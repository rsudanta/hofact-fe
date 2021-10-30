import axios from 'axios';
import {useState} from 'react';
import {setLoading} from '.';
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
        // const pertanyaan = res.data.data;
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
              console.log('gamabar_url', resUpload.data.data[0]);
              res.data.data.gambar_url = `file:///D:/project/PROJECT/HoFact/hofact-be/storage/app/public/${resUpload.data.data[0]}`;
              navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
            })
            .catch(err => {
              console.log('error upload', err);
              showMessage('Upload foto tidak berhasil');
              navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
            });
        } else {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        }
        dispatch(setLoading(false));
        navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
      })
      .catch(err => {
        dispatch(setLoading(false));
        showMessage('Data yang dimasukkan salah');
      });
  };

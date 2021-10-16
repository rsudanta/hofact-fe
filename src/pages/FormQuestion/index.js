import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Gap,
  Header,
  ImagePicker,
  TextArea,
  TextInput,
} from '../../components';

const FormQuestion = ({navigation}) => {
  return (
    <ScrollView style={styles.page}>
      <View>
        <Header
          title="Pertanyaan"
          subTitle="Mulai Bertanya"
          onBack={() => {
            navigation.goBack();
          }}
        />
        <View style={styles.container}>
          <TextInput
            label="Judul Pertanyaan"
            placeholder="Masukkan judul pertanyaan"
          />
          <Gap height={20} />
          <TextArea
            label="Deskripsi Pertanyaan"
            placeholder="Deskripsikan pertanyaanmu"
          />
          <Gap height={20} />
          <ImagePicker label="Gambar" />
          <Gap height={50} />
          <Button text="Kirim" />
        </View>
      </View>
    </ScrollView>
  );
};

export default FormQuestion;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});

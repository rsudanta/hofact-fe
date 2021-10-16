import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Gap, HeaderLogo, Post} from '../../components';

const DetailPost = ({navigation}) => {
  return (
    <View style={styles.page}>
      <HeaderLogo
        onBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView>
        <Post detailPost />
        <Text style={styles.jawaban}>JAWABAN</Text>
        <Post detailPost verify answer />
        <Post detailPost verify answer />
      </ScrollView>
      <View style={styles.button}>
        <Button answer text="Jawab" />
      </View>
    </View>
  );
};

export default DetailPost;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F7FF',
  },
  container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  jawaban: {
    paddingLeft: 24,
    paddingBottom: 20,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderColor: '#C4C4C4',
    color: 'white',
  },
});

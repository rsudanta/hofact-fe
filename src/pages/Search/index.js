import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Post, TextInput} from '../../components';

const Search = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.title}>Pencarian</Text>
        <TextInput placeholder="Cari pertanyaan.." />
      </View>
      <ScrollView>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
  },
  title: {fontFamily: 'Poppins-Medium', fontSize: 22, color: '#020202'},
});

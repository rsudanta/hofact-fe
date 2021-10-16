import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Gap, HomeHeader, Post, RoundButton} from '../../components';
import {useScrollToTop} from '@react-navigation/native';

const Home = ({navigation}) => {
  const ref = React.useRef(null);

  useScrollToTop(ref);
  return (
    <>
      <ScrollView ref={ref} style={styles.page}>
        <HomeHeader title="Beranda" subTitle="Temukan jawabanmu!" />
        <View style={styles.page}>
          <Gap height={20} />
          <Post
            verify
            comment
            onPress={() => {
              navigation.navigate('DetailPost');
            }}
          />
          <Post
            verify
            comment
            onPress={() => {
              navigation.navigate('DetailPost');
            }}
          />
          <Post
            verify
            comment
            onPress={() => {
              navigation.navigate('DetailPost');
            }}
          />
        </View>
      </ScrollView>
      <RoundButton
        style={styles.button}
        onPress={() => {
          navigation.navigate('FormQuestion');
        }}
      />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F7FF'
  }
});

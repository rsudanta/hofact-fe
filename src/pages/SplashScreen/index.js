import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Logo } from '../../assets';
import { getSearchPostData } from '../../redux/action';
import { getData } from '../../utils';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchPostData('', ''));
    setTimeout(() => {
      getData('token').then(res => {
        if (res) {
          navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
        } else {
          navigation.replace('SignIn');
        }
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.page}>
      <Logo />
      <Text style={styles.text}>HOFACT</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#1D2D8C',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    marginTop: -30,
    fontFamily: 'Poppins-SemiBold',
  },
});

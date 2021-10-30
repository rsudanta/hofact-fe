import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-spinkit';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Spinner color="white" type="WanderingCubes" size={50} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

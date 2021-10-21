import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {HScrollView} from 'react-native-head-tab-view';
import {SceneMap, TabBar} from 'react-native-tab-view';
import {CollapsibleHeaderTabView} from 'react-native-tab-view-collapsible-header';
import {History, ProfileHeader, Progress} from '../../components';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#1D2D8C', height: 3, width: 0.55}}
    style={{
      backgroundColor: 'white',
      shadowOpacity: 0,
      elevation: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1
    }}
    tabStyle={{width: 'auto'}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Poppins-Medium',
          color: focused ? '#1D2D8C' : '#8F9AD8'
        }}>
        {route.title}
      </Text>
    )}
  />
);

const Kemajuan = () => (
  <HScrollView index={0}>
    <Progress />
  </HScrollView>
);

const Pertanyaan = () => (
  <HScrollView index={1}>
    <View style={styles.scene}>
      <History />
      <History />
    </View>
  </HScrollView>
);
const Jawaban = () => (
  <HScrollView index={2}>
    <View style={styles.scene}>
      <History />
      <History />
    </View>
  </HScrollView>
);
const Peringkat = () => (
  <HScrollView index={3}>
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
  </HScrollView>
);

const initialLayout = {width: Dimensions.get('window').width};

const Profile = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Kemajuan'},
    {key: 'second', title: 'Pertanyaan'},
    {key: 'third', title: 'Jawaban'},
    {key: 'fourth', title: 'Peringkat'}
  ]);

  const renderScene = SceneMap({
    first: Kemajuan,
    second: Pertanyaan,
    third: Jawaban,
    fourth: Peringkat
  });

  return (
    <CollapsibleHeaderTabView
      renderScrollHeader={() => <ProfileHeader />}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
};

export default Profile;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: 'white',
  }
});

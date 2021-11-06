import {useFocusEffect} from '@react-navigation/core';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {HScrollView} from 'react-native-head-tab-view';
import {SceneMap, TabBar} from 'react-native-tab-view';
import {CollapsibleHeaderTabView} from 'react-native-tab-view-collapsible-header';
import {useDispatch, useSelector} from 'react-redux';
import {
  AnswerHistory,
  Leaderboard,
  ProfileHeader,
  Progress,
  QuestionHistory,
} from '../../components';
import {
  getLeaderboardData,
  getProfileData,
  getUserAnswerData,
  getUserPostData,
} from '../../redux/action';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: '#1D2D8C', height: 3, width: 0.55}}
    style={{
      backgroundColor: 'white',
      shadowOpacity: 0,
      elevation: 0,
      borderBottomColor: '#C4C4C4',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: 'auto'}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'Poppins-Medium',
          color: focused ? '#1D2D8C' : '#8F9AD8',
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
      <QuestionHistory />
    </View>
  </HScrollView>
);
const Jawaban = () => (
  <HScrollView index={2}>
    <View style={styles.scene}>
      <AnswerHistory />
    </View>
  </HScrollView>
);
const Peringkat = () => (
  <HScrollView index={3}>
    <Leaderboard />
  </HScrollView>
);

const initialLayout = {width: Dimensions.get('window').width};

const Profile = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector(state => state.profileReducer);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getProfileData());
      dispatch(getUserPostData());
      dispatch(getUserAnswerData());
      dispatch(getLeaderboardData());
    }, [])
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Kemajuan'},
    {key: 'second', title: 'Pertanyaan'},
    {key: 'third', title: 'Jawaban'},
    {key: 'fourth', title: 'Peringkat'},
  ]);

  const renderScene = SceneMap({
    first: Kemajuan,
    second: Pertanyaan,
    third: Jawaban,
    fourth: Peringkat,
  });

  return (
    <CollapsibleHeaderTabView
      renderScrollHeader={() => (
        <ProfileHeader
          image={
            profile.photo_path == null
              ? profile.profile_photo_url
              : `https://hofact.masuk.id/storage/public/${profile.photo_path}`
          }
          name={profile.name}
          badge={profile.poin}
        />
      )}
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
    backgroundColor: 'white'
  },
});

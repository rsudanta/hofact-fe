import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/core';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BottomNavigator, HeaderSetting} from '../components';
import HeaderProfile from '../components/atoms/HeaderProfile';
import {
  DetailPost,
  EditPassword,
  EditProfile,
  FormAnswer,
  FormQuestion,
  Home,
  Profile,
  Search,
  Setting,
  SignIn,
  SignUp,
  SignUpProfile,
  SplashScreen
} from '../pages';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => <HeaderProfile />
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplahScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpProfile"
        component={SignUpProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FormQuestion"
        component={FormQuestion}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPost"
        component={DetailPost}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FormAnswer"
        component={FormAnswer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{
          header: () => (
            <HeaderSetting
              page="Pengaturan"
              onBack={() => {
                navigation.navigate('Profile');
              }}
            />
          )
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          header: () => (
            <HeaderSetting
              page="Ganti Profil"
              onBack={() => {
                navigation.navigate('Setting');
              }}
            />
          )
        }}
      />
      <Stack.Screen
        name="EditPassword"
        component={EditPassword}
        options={{
          header: () => (
            <HeaderSetting
              page="Ganti Password"
              onBack={() => {
                navigation.navigate('Setting');
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;

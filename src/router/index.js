import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {BottomNavigator} from '../components';
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
          header: () => <HeaderProfile />,
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
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
          title: 'Pengaturan',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 22,
            color: 'black',
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Ganti Profil',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 22,
            color: 'black',
          },
        }}
      />
      <Stack.Screen
        name="EditPassword"
        component={EditPassword}
        options={{
          title: 'Ganti Password',
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 22,
            color: 'black',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;

import * as React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import LoginComponent from './app/components/standalone/login/index';
import HomeComponent from './app/components/standalone/home/index';
import ListComponent from './app/components/standalone/routelist/index';
import RouteInfoComponent from './app/components/standalone/routeinfo/index';
import StoreListComponent from './app/components/standalone/storelist/index';
import StoreOrderDetailComponent from './app/components/standalone/storeorderdetail/index';
import StoreOrderExceptionComponent from './app/components/standalone/storeorderexception/index';
import StoreRouteInfoComponent from './app/components/standalone/storerouteinfo/index';

import HeaderLeftComponent from './app/components/shared/header/index.headerLeft';
import HeaderRightComponent from './app/components/shared/header/index.headerRight';
import HeaderHomeComponent from './app/components/shared/header/index.headerHome';
import { params, pca } from './app/auth';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Stack = createStackNavigator();

const TopTabs = createMaterialTopTabNavigator();

function Details() {
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        activeTintColor: '#00529F',
        inactiveTintColor: '#828282',
        indicatorStyle: {
          backgroundColor: '#00529F',
          height: 4,
        },
        style: {
          backgroundColor: 'white',
        },
        labelStyle: {
          fontSize: widthPercentageToDP('2.8%'),
          margin: 0,
          padding: 0,
          fontFamily: 'Poppins-SemiBold',
          textTransform: 'none',
        },
      }}>
      <TopTabs.Screen name='Route Info' component={StoreRouteInfoComponent} />
      <TopTabs.Screen
        name='Order Details'
        component={StoreOrderDetailComponent}
      />
      <TopTabs.Screen
        name='Order Exceptions'
        component={StoreOrderExceptionComponent}
      />
    </TopTabs.Navigator>
  );
}

function DetailsAndExceptions() {
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        activeTintColor: '#00529F',
        inactiveTintColor: '#828282',
        indicatorStyle: {
          backgroundColor: '#00529F',
          height: 4,
        },
        style: {
          backgroundColor: 'white',
        },
        labelStyle: {
          fontSize: widthPercentageToDP('3%'),
          margin: 0,
          padding: 0,
          fontFamily: 'Poppins-SemiBold',
          textTransform: 'none',
        },
      }}>
      <TopTabs.Screen
        name='Order Details'
        component={StoreOrderDetailComponent}
      />
      <TopTabs.Screen
        name='Order Exceptions'
        component={StoreOrderExceptionComponent}
      />
    </TopTabs.Navigator>
  );
}

function DetailsAndRouteInfo() {
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        activeTintColor: '#00529F',
        inactiveTintColor: '#828282',
        indicatorStyle: {
          backgroundColor: '#00529F',
          height: 4,
        },
        style: {
          backgroundColor: 'white',
        },
        labelStyle: {
          fontSize: widthPercentageToDP('3%'),
          margin: 0,
          padding: 0,
          fontFamily: 'Poppins-SemiBold',
          textTransform: 'none',
        },
      }}>
      <TopTabs.Screen name='Route Info' component={StoreRouteInfoComponent} />
      <TopTabs.Screen
        name='Order Details'
        component={StoreOrderDetailComponent}
      />
    </TopTabs.Navigator>
  );
}

function DetailsOnly() {
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        activeTintColor: '#00529F',
        inactiveTintColor: '#828282',
        indicatorStyle: {
          backgroundColor: '#00529F',
          height: 4,
        },
        style: {
          backgroundColor: 'white',
        },
        labelStyle: {
          fontSize: widthPercentageToDP('3%'),
          margin: 0,
          padding: 0,
          fontFamily: 'Poppins-SemiBold',
          textTransform: 'none',
        },
      }}>
      <TopTabs.Screen
        name='Order Details'
        component={StoreOrderDetailComponent}
      />
    </TopTabs.Navigator>
  );
}

function MainStack({signOut, signIn, authData, userName, isLoading}) {
  return (
    <Stack.Navigator>
      {authData ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeComponent}
            options={({ navigation, route }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "#FFFFFF",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerLeft: () => <HeaderLeftComponent />,
              headerRight: (props) => (
                <HeaderHomeComponent
                  signOut={signOut}
                  userName={userName}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="List"
            component={ListComponent}
            options={({ navigation, route }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "FFFFFF",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerLeft: () => <HeaderLeftComponent />,
              headerRight: (props) => (
                <HeaderRightComponent
                  signOut={signOut}
                  userName={userName}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="RouteInfo"
            component={RouteInfoComponent}
            options={({ navigation, route }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "FFFFFF",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerLeft: () => <HeaderLeftComponent />,
              headerRight: (props) => (
                <HeaderRightComponent
                  signOut={signOut}
                  userName={userName}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="StoreList"
            component={StoreListComponent}
            options={({ navigation, route }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "FFFFFF",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerLeft: () => <HeaderLeftComponent />,
              headerRight: (props) => (
                <HeaderRightComponent
                  signOut={signOut}
                  userName={userName}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={({ navigation, route }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "FFFFFF",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerLeft: () => <HeaderLeftComponent />,
              headerRight: (props) => (
                <HeaderRightComponent
                  signOut={signOut}
                  userName={userName}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Details And RouteInfo"
            component={DetailsAndRouteInfo}
            options={({ navigation, route }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "FFFFFF",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerLeft: () => <HeaderLeftComponent />,
              headerRight: (props) => (
                <HeaderRightComponent
                  signOut={signOut}
                  userName={userName}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Details And Exception"
            component={DetailsAndExceptions}
            options={({ navigation, route }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "FFFFFF",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerLeft: () => <HeaderLeftComponent />,
              headerRight: (props) => (
                <HeaderRightComponent
                  signOut={signOut}
                  userName={userName}
                  navigation={navigation}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Header Right"
            component={HeaderRightComponent}
          ></Stack.Screen>
          <Stack.Screen
            name="Details Only"
            component={DetailsOnly}
            options={({ navigation, route }) => ({
              title: "",
              headerStyle: {
                backgroundColor: "FFFFFF",
                elevation: 0,
                shadowOpacity: 0,
              },
              headerLeft: () => <HeaderLeftComponent />,
              headerRight: (props) => (
                <HeaderRightComponent
                  signOut={signOut}
                  userName={userName}
                  navigation={navigation}
                />
              ),
            })}
          />
        </>
      ) : (
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <LoginComponent
              {...props}
              signIn={signIn}
              authData={authData}
              isLoading={isLoading}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}

const delay = (delay) =>  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    },delay)
  });

export default function App() {
  const [isLoading, setLoading] = React.useState(false);
  const [authData, setAuthData] = React.useState(null);
  const [accountData, setAccountData] = React.useState(null);
  React.useEffect(() => {
    signIn();
  },[])
  
  const signIn = async () => {
    try {
      setLoading(true);
      await delay(0);
      const result = await pca.acquireToken(params);
      setAuthData(result);
      const accounts = await pca.getAccounts();
      setAccountData(accounts[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await pca.signOut({ 
        account: authData.account
      });
      setAuthData(null);
    } catch (error) {
    }
  };

  if (Text.defaultProps == null) Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
  const userName = 
    accountData && accountData.claims && accountData.claims.name
      ? accountData.claims.name
          .split(' ')
          .map((word) => word.slice(0, 1))
          .join('')
      : '';
  return (
    <NavigationContainer>
      <MainStack
        signOut={signOut}
        signIn={signIn}
        authData={authData}
        userName={userName}
        isLoading={isLoading}
      />
    </NavigationContainer>
  );
}

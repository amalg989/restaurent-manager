/*
 * Ncell Single Retailer Application 07.09.2020
 * Copyright © 2020 Ncell. All rights reserved.
 */

import React from 'react';
import {View, StatusBar} from 'react-native';
import HomeScreen from '../container/homeScreen';
import SplashScreen from '../container/splashScreen';
import LogInScreen from '../container/logInScreen';
import SignupScreen from '../container/signUpScreen';
import DetailsScreen from '../container/detailsScreen';
import NavigationHeader from '../container/navigationHeader';
import navigationService from '../services/navigationService';

export const INITIAL_PAGE = 'SplashScreen';

export default {
  SPLASH_SCREEN: {
    name: 'SplashScreen',
    component: SplashScreen,
    options: {
      headerTitle: () => null,
      headerShown: false,
    },
  },
  HOME_SCREEN: {
    name: 'HomeScreen',
    component: HomeScreen,
    options: {
      header: (props) => <NavigationHeader {...props} hideBackBtn />,
    },
  },
  DETAILS_SCREEN: {
    name: 'DetailsScreen',
    component: DetailsScreen,
    options: {
      header: (props) => (
        <NavigationHeader
          {...props}
          onBackPressed={() => {
            navigationService.goBack();
          }}
        />
      ),
    },
  },
  LOGIN_SCREEN: {
    name: 'LogInScreen',
    component: LogInScreen,
    options: {
      headerTitle: () => null,
      headerShown: false,
    },
  },
  SIGNUP_SCREEN: {
    name: 'SignupScreen',
    component: SignupScreen,
    options: {
      headerTitle: () => null,
      headerShown: false,
    },
  },
};

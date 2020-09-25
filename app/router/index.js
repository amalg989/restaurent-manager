/*
 * Ncell Single Retailer Application 17.08.2020
 * Copyright © 2020 Ncell. All rights reserved.
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Screens, {INITIAL_PAGE} from './screens';
import navigationService from '../services/navigationService';

const Stack = createStackNavigator();

const AppNavigationContainer = () => {
  return (
    <NavigationContainer
      ref={(navigratorRef) => {
        navigationService.setTopLevelNavigator(navigratorRef);
      }}>
      <Stack.Navigator
        headerMode="screen"
        initialRouteName={INITIAL_PAGE}
        screenOptions={{gestureEnabled: false}}>
        {Screens &&
          Object.keys(Screens).map((screen) => (
            <Stack.Screen
              name={Screens[screen].name}
              component={Screens[screen].component}
              options={Screens[screen].options}
            />
          ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;

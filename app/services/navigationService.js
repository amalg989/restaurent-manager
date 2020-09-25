/*
 * Ncell Single Retailer Application 07.09.2020
 * Copyright © 2020 Ncell. All rights reserved.
 */

import {CommonActions} from '@react-navigation/native';
import {Linking} from 'react-native';

let _navigator;
let stores;
let _appState;

const DRAWER_DISABLED = true;
const DRAWER_ENABLED = false;

function setTopLevelNavigator(navigatorRef, store, appState) {
  _navigator = navigatorRef;
  stores = store;
  _appState = appState;
}

function getNavigator() {
  return _navigator;
}

function getStores() {
  return stores;
}

function navigateWithState(routeName, params = {}) {
  _navigator.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

function navigate(currentRoute, nextRouteName, params, prevParams = null) {
  let index = 0;
  let actions = [];

  if (currentRoute && nextRouteName) {
    index = 1;
    actions = [
      CommonActions.navigate({
        name: currentRoute,
        params: prevParams,
      }),
      CommonActions.navigate({name: nextRouteName, params}),
    ];
  } else if (!currentRoute && nextRouteName) {
    index = 0;
    actions = [CommonActions.navigate({name: nextRouteName, params})];
  }

  const resetAction = CommonActions.reset({
    index,
    actions,
  });
  _navigator.dispatch(resetAction);
}

function navigateDeepLink(_deepLink = '') {
  let deepLink = _deepLink;

  if (!deepLink) {
    return;
  }

  if (deepLink.indexOf('&') > -1) {
    deepLink = `${deepLink}&isInternal=true`;
  } else {
    deepLink = `${deepLink}?isInternal=true`;
  }

  try {
    Linking.canOpenURL(deepLink)
      .then((canOpen) => {
        if (canOpen) {
          Linking.openURL(deepLink).catch(() => {});
        }
      })
      .catch(() => {});
  } catch (ex) {
    // TODO: Add Validation Here
  }
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

function reset(name, params) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name, params}],
  });
  _navigator.dispatch(resetAction);
}

export default {
  navigate,
  setTopLevelNavigator,
  getNavigator,
  reset,
  navigateDeepLink,
  navigateWithState,
  getStores,
  goBack,
};

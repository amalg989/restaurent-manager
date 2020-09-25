import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaView} from 'react-native-safe-area-context';

import configureStore from './app/redux/store';
import AppNavigationContainer from './app/router';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const {store, persistor} = configureStore();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#222b45'}}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Provider store={store}>
          <StatusBar backgroundColor="#fff" barStyle="light-content" />
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigationContainer />
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    </SafeAreaView>
  );
};

export default App;

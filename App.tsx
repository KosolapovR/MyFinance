import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';

import {store} from './src/store';
import RootStack from 'navigators/RootStack';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootStack isAuth={true} />
    </Provider>
  );
};

export default App;

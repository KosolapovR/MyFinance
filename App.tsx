import React, {useState, Suspense} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';

import {store} from './src/store';
import RootStack from 'navigators/RootStack';
import {DatabaseProvider} from 'context/DatabaseContext';
import {theme} from 'theme';

interface IApp {
  type: 'app' | 'storybook' | '';
}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [app, setApp] = useState<IApp>({type: 'app'});

  if (app.type === 'app') {
    return (
      <StoreProvider store={store}>
        <DatabaseProvider>
          <ThemeProvider theme={theme}>
            <PaperProvider theme={theme}>
              <SafeAreaProvider>
                <StatusBar
                  barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                />
                <RootStack isAuth={true} />
              </SafeAreaProvider>
            </PaperProvider>
          </ThemeProvider>
        </DatabaseProvider>
      </StoreProvider>
    );
  } else if (app.type === 'storybook') {
    const StorybookUIRoot = React.lazy(() => import('./storybook'));
    return (
      <Suspense fallback={<View />}>
        <View style={{flex: 1}}>
          <StorybookUIRoot />
        </View>
      </Suspense>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Button
            title={'StoryBook'}
            onPress={() => setApp({type: 'storybook'})}
          />
          <Button title={'App'} onPress={() => setApp({type: 'app'})} />
        </View>
      </SafeAreaView>
    );
  }
};

export default App;

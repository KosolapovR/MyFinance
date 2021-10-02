import React, {useState, Suspense} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';

import {store} from './src/store';
import RootStack from 'navigators/RootStack';
import {DatabaseProvider} from 'context/DatabaseContext';

interface IApp {
  type: 'app' | 'storybook' | '';
}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [app, setApp] = useState<IApp>({type: ''});

  if (app.type === 'app') {
    return (
      <StoreProvider store={store}>
        <DatabaseProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootStack isAuth={true} />
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

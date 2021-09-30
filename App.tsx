import React, {useCallback, useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';

import {store} from './src/store';
import RootStack from 'navigators/RootStack';
import {createTable, getDBConnection} from 'services/db';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const loadDataCallback = useCallback(async () => {
    try {
      // const initTransactions = [
      //   {id: 0, value: 'go to shop'},
      //   {id: 1, value: 'eat at least a one healthy foods'},
      //   {id: 2, value: 'Do some exercises'},
      // ];
      const db = await getDBConnection();
      await createTable(db);
      // const storedTodoItems = await getTransactions(db);
      // if (storedTodoItems.length) {
      //   setTodos(storedTodoItems);
      // } else {
      //   await saveTodoItems(db, initTodos);
      //   setTodos(initTodos);
      // }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootStack isAuth={true} />
    </Provider>
  );
};

export default App;

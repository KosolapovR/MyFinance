import React from 'react';
import {View, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import {theme} from 'theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function CenterView({children = null}) {
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.topSafeArea} />
          <SafeAreaView style={styles.bottomSafeArea}>
            <StatusBar
              animated={true}
              barStyle="light-content"
              hidden={false}
            />
            <StatusBar backgroundColor="#141416" />
            <View style={styles.content}>{children}</View>
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
  },
  bottomSafeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    justifyContent: 'center',
    flex: 1,
  },
  blackContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

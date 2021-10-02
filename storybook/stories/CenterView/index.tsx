import React from 'react';
import {View, StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import theme from 'theme';

export default function CenterView({children = null}) {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.topSafeArea} />
        <SafeAreaView style={styles.bottomSafeArea}>
          <StatusBar
            animated={true}
            backgroundColor="#000000"
            barStyle="light-content"
            hidden={false}
          />
          <StatusBar backgroundColor="#141416" />
          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: '#1b1b1b',
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: '#1b1b1b',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  blackContent: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000',
  },
});

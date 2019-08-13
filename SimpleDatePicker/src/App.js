import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
} from 'react-native';

import SimpleDatePicker from './components/SimpleDatePicker';

const styles = StyleSheet
  .create(
    {
      container: {
        width: 250,
        margin: 10,
      },
    },
  );

const App = () => (
  <View
    style={styles.container}
  >
    <SimpleDatePicker
    />
  </View>
);

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);

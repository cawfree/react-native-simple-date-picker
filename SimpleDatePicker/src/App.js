import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
} from 'react-native';

import SimpleDatePicker from './components/SimpleDatePicker';

const App = () => (
  <View
    style={{
      width: 220,
    }}
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

import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
} from 'react-native';

import SimpleDatePicker from './components/SimpleDatePicker';

const App = () => (
  <View
    style={[
      StyleSheet.absoluteFill,
      {
        backgroundColor: 'green',
      },
    ]}
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

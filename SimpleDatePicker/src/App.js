import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ModalProvider } from '@cawfree/react-native-modal-provider';
import MaterialMenuModal from '@cawfree/react-native-modal-provider/RNModalProvider/src/components/MaterialMenuModal';

import SimpleDatePicker from './components/SimpleDatePicker';

const styles = StyleSheet
  .create(
    {
      container: {
        width: 250,
      },
    },
  );

const App = () => (
  <View
    style={styles.container}
  >
    <ModalProvider
      ModalComponent={MaterialMenuModal}
      position={({ x, y, width, height }) => ({
        position: 'absolute',
        left: x,
        // XXX: Apply some additional padding.
        top: y + height + 5,
      })}
    >
    
      <SimpleDatePicker
        onDatePicked={console.log}
      />
    </ModalProvider>
  </View>
);

let hotWrapper = () => () => App;
if (Platform.OS === 'web') {
  const { hot } = require('react-hot-loader');
  hotWrapper = hot;
}
export default hotWrapper(module)(App);

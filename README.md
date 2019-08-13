# @cawfree/react-native-simple-date-picker
An idiot-proof date picker for React Native, backed by [moment.js](https://github.com/moment/moment).

## 🚀 Getting Started

Using [`npm`]():
```
npm install --save @cawfree/react-native-simple-picker
```

Using [`yarn`]():
```
yarn add @cawfree/react-native-simple-date-picker
```

## ✍️ Example

```javascript
import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
} from 'react-native';

import Moment from 'moment';
import { SimpleDatePicker } from '@cawfree/react-native-simple-date-picker';

const styles = StyleSheet
  .create(
    {
      container: {
        width: 250,
        margin: 10,
      },
    },
  );

// XXX: Note that you can initialize the rendered date using the `date` prop, or provide some custom view.
const App = () => (
  <View
    style={styles.container}
  >
    <SimpleDatePicker
      theme={{
        fontSize: 16,
        color: '#444444',
        disabledColor: '#CCCCCC',
        borderRadius: 5,
        padding: 5,
        borderWidth: 1,
        highlightColor: 'blue',
      }}
      minDate: Moment().subtract(10, 'years'),
      maxDate: Moment().add(10, 'years'),
      date={undefined}
      onDatePicked={moment => console.log(moment)}
      renderDescription={null}
    />
  </View>
);

```

## 📋 Prop Types


| Prop Name             | Data Type             | Required  | Default                                                                                                                                           | Description                                                                                                                       |
|---------------------  |---------------------  |---------- |-------------------------------------------------------------------------------------------------------------------------------------------------- |---------------------------------------------------------------------------------------------------------------------------------- |
| `Container`           | propTypes.func        | false     | ({ children, ...extraProps }) => (   <View     {...extraProps}   >     {children}    </View> )                                                    | Defines the React Component instance to use when containing the DatePicker components.                                            |
| `theme`               | propTypes.shape({})   | false     | {   fontSize: 16,   color: '#444444',   disabledColor: '#CCCCCC',   borderRadius: 5,   padding: 1,   borderWidth: 1,   highlightColor: 'blue', }  | Defines some style configuration for the <SimpleDatePicker />.                                                                    |
| `date`                | propTypes.shape       | false     | undefined                                                                                                                                         | A moment object. Can be used to define the current date to render using the SimpleDatePicker, or can be left `null`/`undefined`.  |
| `onDatePicked`        | propTypes.func        | false     | moment => null                                                                                                                                    | Callback for when the user has finished selecting a date, or made an update to an existing date and that date is valid.           |
| `minDate`             | propTypes.shape({})   | false     | Moment().subtract(100, 'years')                                                                                                                   | The minimum allowable selectable date.                                                                                            |
| `maxDate`             | propTypes.shape({})   | false     | Moment()                                                                                                                                          | The maximum allowable selectable date.                                                                                            |
| `renderDescription`   | propTypes.func        | false     | moment => <Text>{moment.format(...)}</Text>                                                                                                       | A function that can be called to render a React component once a valid date has been selected.                                    |

## ✌️ License
[MIT](https://opensource.org/licenses/MIT).

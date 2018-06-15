import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import rootCameraContainer from './screens/Camera';
import rootText from './screens/Text';
import store from './redux/store';
import { Provider } from 'react-redux';

const RootNavigator = createStackNavigator(
  {
    rootCameraContainer: { screen: rootCameraContainer },
    rootText: { screen: rootText }
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default class App extends React.Component {
  static navigationOptions = {
    header: { visible: false }
  };
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

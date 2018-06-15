import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import rootCamera from './screens/Camera';
import rootText from './screens/Text';

const RootNavigator = createStackNavigator({
  rootText: { screen: rootText },
  rootCamera: { screen: rootCamera }
});
export default class App extends React.Component {
  render() {
    return <RootNavigator />;
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

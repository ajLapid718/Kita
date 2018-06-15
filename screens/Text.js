import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

const rootText = props => {
  const { navigate } = props.navigation;
  return (
    <View style={{ flex: 1 }}>
      <Text style={{textAlign: 'center'}}>Hello World </Text>
      <Button title="Go To Camera" onPress={() => navigate('rootCamera')} />
    </View>
  );
};

export default rootText;

import React from 'react';
import { Text, View, Button } from 'react-native';

export const rootText = props => {
  let { navigate } = props.navigation;
  let targetText = props.navigation.state.params.text;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View stlye={{ flex: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 30 }}>
            {targetText}
          </Text>
        </View>
      </View>
      <Button
        title="Go To Camera"
        onPress={() => navigate('rootCameraContainer')}
      />
    </View>
  );
};

export default rootText;

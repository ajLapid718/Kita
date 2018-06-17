import React from 'react';
import { Text, View, Button } from 'react-native';
import { Speech } from 'expo';
export const rootText = props => {
  let { navigate } = props.navigation;
  let targetText = props.navigation.state.params.text || 'Text not recognized';
  Expo.Speech.speak(targetText);

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
        onPress={() => {
          Expo.Speech.stop();
          navigate('rootCameraContainer');
        }}
      />
    </View>
  );
};

export default rootText;

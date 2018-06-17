import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'native-base';

export const rootText = props => {
  let { navigate } = props.navigation;
  let targetText = props.navigation.state.params.text || 'Text not recognized';
  Expo.Speech.speak(targetText);

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Button
        block
        primary
        onPress={() => {
          Expo.Speech.stop();
          navigate('rootCameraContainer');
        }}>
        <Text style={{ color: 'white' }}> Back to Camera </Text>
      </Button>
      <ScrollView style={{ flex: 1, margin: 20 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View stlye={{ flex: 1 }}>
            <Text style={{ fontSize: 20 }}>{targetText}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default rootText;

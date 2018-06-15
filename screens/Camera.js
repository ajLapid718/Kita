import React from 'react';
import { View, CameraRoll } from 'react-native';
import { Button, Text } from 'native-base';

import { Camera, Permissions } from 'expo';

export default class rootCamera extends React.Component {
  constructor() {
    super();
    this.snap = this.snap.bind(this);
    this.state = {
      hasCameraPermission: null
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  snap = async () => {
    if (this.camera) {
      const { uri } = await this.camera.takePictureAsync();

      await CameraRoll.saveToCameraRoll(uri, 'photo');
    }
  };
  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'center'
            }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}>
            <View style={{ margin: 20, padding: 20 }}>
              <Button bordered onPress={this.snap} light>
                <Text>Capture</Text>
              </Button>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

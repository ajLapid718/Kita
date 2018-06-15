import React from 'react';
import { Text, View, TouchableOpacity, Button, CameraRoll } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class rootCamera extends React.Component {
  constructor() {
    super();
    this.snap = this.snap.bind(this);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      cameraRollUri: null
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  snap = async () => {
    console.log('hit');
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      let saveResult = await CameraRoll.saveToCameraRoll(photo.uri, 'photo');
      this.setState({ cameraRollUri: saveResult });
    }
  };
  render() {
    console.log(this.props.navigation);
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            ref={ref => {
              this.camera = ref;
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}>
                <Text
                  style={{ fontSize: 20, marginBottom: 10, color: 'white' }}>
                  {' '}
                  Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <Button onPress={this.snap} title="button">
                Take pic
              </Button>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

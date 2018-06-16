import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { Camera, Permissions } from 'expo';
import Loader from './Loader';
import config from '../config';

class rootCamera extends React.Component {
  constructor() {
    super();
    this.snap = this.snap.bind(this);
    this.state = {
      hasCameraPermission: null,
      loading: false
    };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    this.setState({ loading: true });
    const { navigate } = this.props.navigation;
    if (this.camera) {
      let photo;
      let textRecieved;
      try {
        photo = await this.camera.takePictureAsync({ base64: true });
        textRecieved = await this.getText(photo.base64);
        this.setState({ loading: false });
      } catch (err) {
        console.log(err);
      }
      navigate('rootText', { text: textRecieved });
    }
  };

  getText = image => {
    return fetch(config.googleCloud.api + config.googleCloud.apiKey, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: image
            },
            features: [
              {
                type: 'TEXT_DETECTION',
                maxResults: 1
              }
            ]
          }
        ]
      })
    })
      .then(response => {
        return response.json();
      })
      .then(text => {
        return text.responses[0].fullTextAnnotation.text;
      })
      .catch(err => console.log(err));
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
          <Loader loading={this.state.loading} />
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

export default rootCamera;

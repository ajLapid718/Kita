import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { Camera, Permissions, ImageManipulator } from 'expo';
import Loader from './Loader';
import config from '../config';
import axios from 'axios';
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
      let translatedText;
      try {
        let { uri } = await this.camera.takePictureAsync();
        photo = await ImageManipulator.manipulate(
          uri,
          [{ resize: { width: 420 } }],
          {
            base64: true
          }
        );
        textRecieved = await this.getText(photo.base64);
        translatedText = await this.getTranslatedText(textRecieved);
        if (translatedText === 'undefined') {
          translatedText = 'Text not recognized';
        }
        this.setState({ loading: false });
      } catch (err) {
        this.setState({ loading: false });
        console.log(err);
      }
      navigate('rootText', { text: translatedText });
    }
  };

  getText = image => {
    return axios
      .post(config.googleCloudVision.api + config.apiKey, {
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
      .then(response => response.data)
      .then(text => text.responses[0].fullTextAnnotation.text)
      .catch(err => console.log(err));
  };

  getTranslatedText = async parsedText => {
    let lang = await Expo.DangerZone.Localization.getCurrentLocaleAsync();
    let toLang = lang.slice(0, 2);
    let text = parsedText;
    const API_KEY = config.apiKey;
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(text);
    url += `&target=${toLang}`;

    return axios
      .post(url)
      .then(res => res.data)
      .then(response => response.data.translations[0].translatedText)
      .catch(error => {
        console.log('There was an error with the translation request: ', error);
      });
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
            autoFocus={Camera.Constants.AutoFocus.on}
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

// Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');

// // Creates a client
// const client = new vision.ImageAnnotatorClient();

// ACTION NAMING;

const GET_PARSED_TEXT_OBJ = 'GET_PARSED_TEXT_OBJ';

// ACTION CREATOR;
import config from '../config';
export const getParsedTextObj = parsedTextObj => {
  return {
    type: GET_PARSED_TEXT_OBJ,
    payload: parsedTextObj
  };
};

// THUNK;
export const getParsedTextThunk = image => {
  fetch(config.googleCloud.api + config.googleCloud.apiKey, {
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
      let text = response.json();

      return text;
    })
    .then(text => console.log(text.responses[0].fullTextAnnotation.text));
};

// REDUCER;

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PARSED_TEXT_OBJ:
      return { ...state, parsedTextObj: action.payload };
    default:
      return state;
  }
};

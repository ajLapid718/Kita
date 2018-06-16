// Imports the Google Cloud client library
// const vision = require('@google-cloud/vision');

// // Creates a client
// const client = new vision.ImageAnnotatorClient();

// ACTION NAMING;

const GET_PARSED_TEXT_OBJ = 'GET_PARSED_TEXT_OBJ';

// ACTION CREATOR;

export const getParsedTextObj = parsedTextObj => {
  return {
    type: GET_PARSED_TEXT_OBJ,
    payload: parsedTextObj
  };
};

// THUNK;
export const getParsedTextThunk = uri => {
  // // Performs label detection on the image file
  // client
  //   .labelDetection('https://i.chzbgr.com/full/9013910528/hAB49129F/')
  //   .then(results => {
  //     const labels = results[0].labelAnnotations;

  //     console.log('Labels:');
  //     labels.forEach(label => console.log(label.description));
  //   })
  //   .catch(err => {
  //     console.error('ERROR:', err);
  //   }); 
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

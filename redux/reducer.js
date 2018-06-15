// RAPID;

const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI(
  'default-application_5b2424a2e4b06fc8c9001bf8',
  '5b31d76f-4152-4c4a-a53a-336f1869be70'
);

// ACTION NAMING;

const GET_PARSED_TEXT_OBJ = 'GET_PARSED_TEXT_OBJ';

// ACTION CREATOR;

export const getParsedTextObj = (parsedTextObj) => {
  return {
    type: GET_PARSED_TEXT_OBJ,
    payload: parsedTextObj
  }
}

// THUNK;
export const getParsedTextThunk = (uri) => {
  rapid
  .call('GoogleCloudVision', 'batchPictureDetections', {
    apiKey: 'AIzaSyCdKtPzdvBGc_LVPVtvNF1HuJqVZJsI_2Q',
    type: 'text',
    images: [uri]
  })
  .on('success', payload => {
    console.log(payload);
    getParsedText(payload);
  })
  .on('error', err => {
    console.log(err);
  });
}

// REDUCER;

export default reducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PARSED_TEXT_OBJ:
      return {...state, parsedTextObj: action.payload};
    default:
      return state;
  }
}

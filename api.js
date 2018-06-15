const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI(
  'default-application_5b2424a2e4b06fc8c9001bf8',
  '5b31d76f-4152-4c4a-a53a-336f1869be70'
);

rapid
  .call('GoogleCloudVision', 'batchPictureDetections', {
    apiKey: 'AIzaSyCdKtPzdvBGc_LVPVtvNF1HuJqVZJsI_2Q',
    type: 'text',
    images: ['https://i.chzbgr.com/full/9013910528/hAB49129F/']
  })
  .on('success', payload => {
    /*YOUR CODE GOES HERE*/

    console.log(payload);
  })
  .on('error', payload => {
    /*YOUR CODE GOES HERE*/

    console.log(payload);
  });

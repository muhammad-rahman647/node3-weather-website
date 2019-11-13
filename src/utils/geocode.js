const request = require('request');

const geocode = (address, callback) => {
  const geocodeURL =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoicmFobWFuMzQiLCJhIjoiY2sybGthMDJ1MDN2azNtbnp6cWdrM2FkZiJ9.YvZ0cKOmsbZPKZCequ5FMQ&limit=1';

  request({ url: geocodeURL, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect weather services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;

// const geocodeURL =
//   'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicmFobWFuMzQiLCJhIjoiY2sybGthMDJ1MDN2azNtbnp6cWdrM2FkZiJ9.YvZ0cKOmsbZPKZCequ5FMQ&limit=1';

// request({ url: geocodeURL, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect weather services');
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find location. Try another search.');
//   } else {
//     const latitude = response.body.features[0].center[0];
//     const longitude = response.body.features[0].center[1];
//     console.log(latitude, longitude);
//   }
// });

const request = require('request');

const geocode = (address, callback) => {
  const mapboxToken = 'pk.eyJ1IjoidGFyYXNweXpvIiwiYSI6ImNqeGhzcTRvaTFmZGgzeW13amdpa3lvdm0ifQ.hXXXEWpVxWVHT9SULVB_gg';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxToken}&limit=1&language=en`;

  request({ url, json: true }, (error, response) => {
    if(error) {
      callback('Something went wrong! :)');
    } else if(response.statusCode !== 200) {
      callback(`code: ${response.statusCode}, error: ${response.statusMessage}`);
    } else if(!response.body.features.length) {
      callback('Data not found!');
    } else {
      callback(null, {
        coordinates: response.body.features[0].center,
        place_name: response.body.features[0].place_name
      });
    }
  });
};

const forecast = (coordinates, callback) => {
  const darkSkyToken = '63312df395ad83b387cbbbf08eb6948e';
  const url = `https://api.darksky.net/forecast/${darkSkyToken}/${coordinates[1]},${coordinates[0]}?units=si`;

  request({ url, json: true }, (error, response) => {
    if(error) {
      callback('Something went wrong! :)');
    } else if(response.statusCode !== 200) {
      callback(`code: ${response.statusCode}, error: ${response.statusMessage}`);
    } else {
      callback(null, response);
    }
  });
};

module.exports = {
  forecast,
  geocode
};

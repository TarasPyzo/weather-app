const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { geocode, forecast } = require('./utils.js');

const port = process.env.PORT || 3000;
const app = express();

// setup views settings
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// add middleware
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.render('index.hbs', { title: 'Header' });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { title: 'Header' });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({ message: '[address] is required!' });
  }

  geocode(req.query.address, (geocodeErrorMessage, { place_name, coordinates } = {}) => {
    if(geocodeErrorMessage) {
      return res.send({ message: geocodeErrorMessage });
    }

    forecast(coordinates, (forecastErrorMessage, forecastResponse) => {
      if(forecastErrorMessage) {
        return res.send({ message: forecastErrorMessage });
      }

      res.send({
        place_name,
        coordinates,
        temperature: forecastResponse.body.currently.temperature
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404.hbs');
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});

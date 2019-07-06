const handleForm = (event) => {
  event.preventDefault();

  const location = document.getElementById('location');
  const infoTag = document.getElementById('info-field');

  if(!location.value) return infoTag.innerHTML = 'Fill the location!';

  infoTag.innerText = 'Loading...';

  fetch(`/weather?address=${location.value}`)
    .then(response => response.json())
    .then((data) => {
      if(data.message) return infoTag.innerHTML = data.message;

      infoTag.innerHTML = `Place name: ${data.place_name}<br />Coordinates: ${data.coordinates}<br />Temperature: ${data.temperature}`;
    })
    .catch(error => console.log(error));
}

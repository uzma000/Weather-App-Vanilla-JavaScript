window.addEventListener("load", () => {
  let locationName = document.querySelector("#location-name");
  let locationRegion = document.querySelector("#location-region");
  let locationCountry = document.querySelector("#location-country");

  let weatherIcon = document.querySelector("#weather-icon");
  let temperatureDescription = document.querySelector(
    "#temperature-description"
  );

  let temperatureDegreeFahrenheit = document.querySelector(
    "#temperature-degreeF"
  );
  let temperatureDegreeCelsius = document.querySelector("#temperature-degreeC");

  let longitude;
  let latitude;

  // function pageSetUp() {
  //   getLocationData();
  // }
  // window.onload = pageSetUp;

  //function getLocationData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      //console.log(position);
      longitude = position.coords.longitude;
      latitude = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?key=a65c11d6b5bb4a9a8c0152851210811&q=${latitude},${longitude}&aqi=no`;

      fetch(api)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          // console.log(data);
          writeLocationName(data);
          makeWeatherIcon(data);
          showWeatherDescription(data);
          showTemperature(data);
          //Extras
          showWindSpeed(data);
          showWindDirection(data);
          showRainFall(data);
          showFeelsLike(data);
          showVisibility(data);
          showUVIndex(data);
          showLastUpdated(data);
        });
    });
  } else {
    locationName.innerHTML =
      "Please Allow location to get the Weather of Current Location.";
  }
  //}

  //=======All Functions======/////

  // location name
  function writeLocationName(data) {
    locationName.textContent = `${data.location.name}`;
    locationRegion.textContent = `${data.location.region}`;
    locationCountry.textContent = `${data.location.country}`;
  }

  // Weather Icon from API
  function makeWeatherIcon(data) {
    weatherIcon.src = data.current.condition.icon;
  }
  // Temperature Description
  function showWeatherDescription(data) {
    temperatureDescription.textContent = data.current.condition.text;
  }
  // Temperature
  function showTemperature(data) {
    // location Temperature in Fahrenheit
    temperatureDegreeFahrenheit.textContent = `${data.current.temp_f} F`;
    // location Temperature in Celsius
    temperatureDegreeCelsius.textContent = `${data.current.temp_c} C`;
  }

  // Wind Speed
  function showWindSpeed(data) {
    let windSpeed = document.getElementById("wind");
    windSpeed.innerHTML = `Wind Speed: ${data.current.wind_mph}mph , ${data.current.wind_kph}kph`;
  }
  // Wind Direction
  function showWindDirection(data) {
    let windDirection = document.getElementById("wind-direction");
    windDirection.innerHTML = `Wind Direction: ${data.current.wind_dir}`;
  }
  // Rain Fall
  function showRainFall(data) {
    let rainFall = document.getElementById("rain");
    rainFall.innerHTML = `Rain : ${data.current.precip_in}in , ${data.current.precip_mm}mm`;
  }
  // Feels like
  function showFeelsLike(data) {
    let tempFeelsLike = document.getElementById("feelsLike");
    tempFeelsLike.innerHTML = `Feels Like: ${data.current.feelslike_c}C , ${data.current.feelslike_f}F`;
  }
  // Visibility
  function showVisibility(data) {
    let visibility = document.getElementById("visibility");
    visibility.innerHTML = `Visibility: ${data.current.vis_miles}miles , ${data.current.vis_km}km`;
  }
  // UV Index
  function showUVIndex(data) {
    let uvIndex = document.getElementById("uv-index");
    uvIndex.innerHTML = `UV Index: ${data.current.uv}`;
  }
  // Show last update time
  function showLastUpdated(data) {
    let lastUpdated = document.getElementById("update-time");
    lastUpdated.textContent = `Last Updated: ${data.current.last_updated}`;
  }
});

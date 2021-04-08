/* Function fetch sentimental data and to update UI respectively */
async function updateUserInterface(dataURL) {
  const results = document.querySelector("#results-section");
  results.innerHTML = "";
  const getUserData = await getData(dataURL).then(async (data) => {
    const resultsSection1 = document.createElement("section");
    resultsSection1.id = "first-results-section";
    resultsSection1.innerHTML = `<div id="pixabay-image"><img src=${data.travelPictureData.picture}></div>
      <div id="first-results-text">
        <p id="trip-result-title">Your Trip Results</p>
        <div id="current-date-results"><strong>Current Date: </strong>${data.userData.currentDate}.</div>
        <div id="start-date-results"><strong>Start Date: </strong>${data.userData.startDate}.</div>
        <div id="end-date-results"><strong>End Date: </strong>${data.userData.endDate}.</div>
        <div id="countdown-results"><strong>Countdown: </strong>${data.userData.countdown} day(s) remaining.</div>
        <div id="length-trip-results"><strong>Length of Trip: </strong>${data.userData.durationTrip} day(s).</div>
        <div id="destination-results"><strong>Destination: </strong>${data.travelCoordinatesData.name}.</div>
        <div id="country-results"><strong>Country: </strong>${data.travelCoordinatesData.country}.</div>
        <div id="latitude-results"><strong>Latitude: </strong>${data.travelCoordinatesData.latitude}° N.</div>
        <div id="longitude-results"><strong>Longitude: </strong>${data.travelCoordinatesData.longitude}° W.</div>
        <div id="notes-results"><strong>Notes: </strong>${data.userData.notes}</div>
      </div>`;
    results.appendChild(resultsSection1);
    const resultsSection2 = document.createElement("section");
    resultsSection2.id = "second-results-section";
    let dateArray = data.userData.arrayDatesForDurationTrip;
    console.log(dateArray);
    dateArray.forEach(async function (date, index) {
      let weatherCard = document.createElement("div");
      weatherCard.classList.add("weather-summary");
      weatherCard.id = `second-results-block-${index}`;
      let iconCode =
        data.travelWeatherData.weatherData.data[index].weather.icon;
      let description =
        data.travelWeatherData.weatherData.data[index].weather.description;
      let temperature = data.travelWeatherData.weatherData.data[index].temp;
      weatherCard.innerHTML = `<div id="day-index-results">Day ${index}</div>
        <div id="date-results">${date}</div>
        <div id="weather-icon-results"><img src=${concatenateWeatherbitIconURL(
          iconCode
        )}></div>
        <div id="temperature-results">${temperature} &#8451</div>
        <div id="weather-description-results">${description}.</div>`;
      resultsSection2.appendChild(weatherCard);
    });
    results.appendChild(resultsSection2);
  });
  return getUserData;
}

// Function to concatenate Weatherbit icon URL
function concatenateWeatherbitIconURL(iconCode) {
  return `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
}

/* Function to GET Project Data */
async function getData(url = "") {
  const res = await fetch(url);
  try {
    const Data = await res.json();
    return Data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export { updateUserInterface, getData };

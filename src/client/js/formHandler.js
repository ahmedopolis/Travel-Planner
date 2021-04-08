function runAction() {
  const submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);
    console.log("::: Form Submitted :::");
    const destination = document.querySelector("#destination").value;
    const startDate = document.querySelector("#start-date").value;
    const endDate = document.querySelector("#end-date").value;
    const notes = document.querySelector("#notes").value;
    const userData = {
      currentDate: currentDate,
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      notes: notes,
    };
    printUserData(userData);
    const hostName = "localhost";
    const port = 8080;
    const geonamesSubfolder = "coordinates";
    const weatherbitSubfolder = "weatherData";
    const pixabaySubfolder = "picturesData";
    const getDataSubfolder = "apiData";
    const localDataGeonamesURl = concatenateApiFilePath(
      hostName,
      port,
      geonamesSubfolder
    );
    const localDataWeatherbitURl = concatenateApiFilePath(
      hostName,
      port,
      weatherbitSubfolder
    );
    const localDataPixabayURl = concatenateApiFilePath(
      hostName,
      port,
      pixabaySubfolder
    );
    const localGETApiURl = concatenateApiFilePath(
      hostName,
      port,
      getDataSubfolder
    );
    console.log("::: All Folders used to gather data.  :::");
    console.log(`The Geonames' Local Folder -> ${localDataGeonamesURl}`);
    console.log(`The Weatherbit's Local Folder -> ${localDataWeatherbitURl}`);
    console.log(`The Pixabay's Local Folder -> ${localDataPixabayURl}`);
    console.log(`The GET Api's Local Folder -> ${localGETApiURl}`);
    processUserData(
      localDataGeonamesURl,
      localDataWeatherbitURl,
      localDataPixabayURl,
      localGETApiURl,
      userData
    );
  });

  // Function to concatenate the file path for an api route
  function concatenateApiFilePath(hostName, port, subfolder) {
    return `http://${hostName}:${port}/${subfolder}`;
  }

  // Function to print user data
  function printUserData(projectData) {
    console.log("::: User Data Received :::");
    console.log(`Current Date -> ${projectData.currentDate}.`);
    console.log(`Destination -> ${projectData.destination}.`);
    console.log(`Start Date -> ${projectData.startDate}.`);
    console.log(`End Date-> ${projectData.endDate}.`);
    console.log(`Notes -> ${projectData.notes}.`);
  }

  // Async function to chain promises
  async function processUserData(
    geonamesDataURL,
    weatherbitDataURL,
    pixabayDataURL,
    getDataURL,
    userData
  ) {
    let postGeonamesDataReturn = await postData(geonamesDataURL, userData).then(
      (data1) => {
        let postWeatherbitDataReturn = postData(weatherbitDataURL, data1).then(
          (data2) => {
            let postPixabayDataReturn = postData(pixabayDataURL, data2).then(
              async (data3) => {
                let updateUI = await updateUserInterface(getDataURL, data3);
              }
            );
          }
        );
      }
    );
  }

  /* Function fetch sentimental data and to update UI respectively */
  async function updateUserInterface(dataURL) {
    let results = document.querySelector("#results-section");
    let getUserData = await getData(dataURL).then(async (data) => {
      let resultsSection1 = document.createElement("section");
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

      let resultsSection2 = document.createElement("section");
      resultsSection2.id = "second-results-section";
      results.appendChild(resultsSection1);
      results.appendChild(resultsSection2);
    });
    return getUserData;
  }

  // Function to concatenate Weatherbit icon URL
  function concatenateWeatherbitIconURL(iconCode) {
    return `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;
  }

  /* Function to POST data */
  async function postData(url = "", data) {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const newData = res;
      return newData;
    } catch (error) {
      console.error("Error:", error);
    }
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
}

/**
 * @description This function contains three other functions. The 'loadRainbowMainHeadingText'
 * function is run once the whole page is loaded. Only the first 'h1' is modified. There's also
 * one heading of 'h1' in 'index/html'. In the 'generateRandomRainbowMainHeading' function, the
 * inner html code of 'h1' is cleared. At every character of the first heading, each character's
 * color is changed at random using the 'randomColorString' function.
 */
function mainHeadingRandomColorEdit() {
  window.addEventListener("load", loadRainbowMainHeadingText);
  function loadRainbowMainHeadingText() {
    const instanceOfHeadingList = document.getElementsByTagName("h1");
    generateRandomRainbowMainHeading(instanceOfHeadingList[0]);
  }
  function generateRandomRainbowMainHeading(element) {
    let mainHeadingText = element.innerText;
    element.innerHTML = "";
    for (let i = 0; i < mainHeadingText.length; i++) {
      let charMainHeadingText = document.createElement("span");
      charMainHeadingText.style.color = randomColorString();
      charMainHeadingText.innerHTML = mainHeadingText[i];
      element.appendChild(charMainHeadingText);
    }
  }
  function randomColorString() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }
}

// Function to append the 'runAction' function at after load.
function loadStarter() {
  if (document.readyState === "complete") {
    window.addEventListener("load", runAction);
    mainHeadingRandomColorEdit();
  } else {
    window.addEventListener("load", runAction);
    mainHeadingRandomColorEdit();
    return () => window.removeEventListener("load", runAction);
  }
}

loadStarter();

export { runAction };

import { updateUserInterface } from "./updateUI";
import { regexCityName } from "./validCityName";
import { checkOrderDate } from "./checkDates";

//Function to manipulate data from DOM and bind other functions
function runAction() {
  const submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().slice(0, 10);
    console.log("::: Form Submitted :::");
    const destination = document.querySelector("#destination").value;
    const destinationBoolean = regexCityName(destination);
    console.log(destinationBoolean);
    const startDate = document.querySelector("#start-date").value;
    const endDate = document.querySelector("#end-date").value;
    const checkDatesBoolean = checkOrderDate(currentDate, startDate, endDate);
    console.log(checkDatesBoolean);
    const notes = document.querySelector("#notes").value;
    if (destinationBoolean && checkDatesBoolean) {
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
      const geoNamesSubfolder = "coordinates";
      const weatherbitSubfolder = "weatherData";
      const pixabaySubfolder = "picturesData";
      const getDataSubfolder = "apiData";
      const localDataGeoNamesURl = concatenateApiFilePath(
        hostName,
        port,
        geoNamesSubfolder
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
      printFolders(
        localDataGeoNamesURl,
        localDataWeatherbitURl,
        localDataPixabayURl,
        localGETApiURl
      );
      processUserData(
        localDataGeoNamesURl,
        localDataWeatherbitURl,
        localDataPixabayURl,
        localGETApiURl,
        userData
      );
    }
  });

  // Function to concatenate the file path for an api route
  function concatenateApiFilePath(hostName, port, subfolder) {
    return `http://${hostName}:${port}/${subfolder}`;
  }

  // Function to print folders
  function printFolders(
    localDataGeoNamesURl,
    localDataWeatherbitURl,
    localDataPixabayURl,
    localGETApiURl
  ) {
    console.log("::: All Folders used to gather data.  :::");
    console.log(`The GeoNames' Local Folder -> ${localDataGeoNamesURl}`);
    console.log(`The Weatherbit's Local Folder -> ${localDataWeatherbitURl}`);
    console.log(`The Pixabay's Local Folder -> ${localDataPixabayURl}`);
    console.log(`The GET Api's Local Folder -> ${localGETApiURl}`);
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
    geoNamesDataURL,
    weatherbitDataURL,
    pixabayDataURL,
    getDataURL,
    userData
  ) {
    let postGeoNamesDataReturn = await postData(geoNamesDataURL, userData).then(
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
}

export { runAction };

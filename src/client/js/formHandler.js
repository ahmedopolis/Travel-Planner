function runAction() {
  const submitButton = document.querySelector("#submit-button");
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("::: Form Submitted :::");
    const currentCity = document.querySelector("#current-city").value;
    const destination = document.querySelector("#destination").value;
    const startDate = document.querySelector("#start-date").value;
    const endDate = document.querySelector("#end-date").value;
    const notes = document.querySelector("#notes").value;
    userData = {
      currentCity: currentCity,
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      notes: notes,
    };
    printUserData(userData);
    const hostName = "localhost";
    const port = 8080;
    const localDataURl = `http://${hostName}:${port}/apiData`;
    console.log(`The localHost URL -> ${localDataURl}`);
  });

  // Function to print user data
  function printUserData(projectData) {
    console.log("::: User Data Received :::");
    console.log(`Current City -> ${projectData.currentCity}.`);
    console.log(`Destination -> ${projectData.destination}.`);
    console.log(`startDate -> ${projectData.startDate}.`);
    console.log(`endDate-> ${projectData.endDate}.`);
    console.log(`notes -> ${projectData.notes}.`);
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

// Function to append the 'runAction' function at after load.
function loadStarter() {
  if (document.readyState === "complete") {
    window.addEventListener("load", runAction);
  } else {
    window.addEventListener("load", runAction);
    return () => window.removeEventListener("load", runAction);
  }
}

loadStarter();

//export { runAction };

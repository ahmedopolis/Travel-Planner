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
    const localDataURl = `http://${hostName}:${port}/apiData`;
    console.log(`The localHost URL -> ${localDataURl}`);
  });

  // Function to print user data
  function printUserData(projectData) {
    console.log("::: User Data Received :::");
    console.log(`Current Date -> ${projectData.currentDate}.`);
    console.log(`Destination -> ${projectData.destination}.`);
    console.log(`Start Date -> ${projectData.startDate}.`);
    console.log(`End Date-> ${projectData.endDate}.`);
    console.log(`Notes -> ${projectData.notes}.`);
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

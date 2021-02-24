import { validURL } from "./validURL";

function runAction() {
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

export { runAction };

// Function to randomize page header colors
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

export { mainHeadingRandomColorEdit };

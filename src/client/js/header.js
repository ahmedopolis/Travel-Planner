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

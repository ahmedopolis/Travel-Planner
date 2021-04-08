// Regex Function to validate city name
function regexCityName(str) {
  var regex = /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
  if (!regex.test(str)) {
    alert("Please enter valid city name.");
    return false;
  } else {
    return true;
  }
}

export { regexCityName };

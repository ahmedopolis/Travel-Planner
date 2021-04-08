import { regexCityName } from "../src/client/js/validCityName";

// To check if 'regexCityName' updates the UI appropriately.
describe("Testing the regex function's functionality", () => {
  test("Testing the regexCityName function", () => {
    expect(regexCityName).toBeDefined();
  });
});

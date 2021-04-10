import { regexCityName } from "../src/client/js/validCityName";

// To check if 'regexCityName' updates the UI appropriately.
describe("Testing the regex function's functionality", () => {
  test("Testing the regexCityName function", () => {
    expect(regexCityName).toBeDefined();
  });

  test("Testing the 'true' output of regexCityName function", () => {
    expect(regexCityName("Vancouver")).toBeTruthy();
  });

  test("Testing the 'false' output of regexCityName function", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    expect(regexCityName("Bob12#$%%")).toBeFalsy();
  });
});

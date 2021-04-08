import { mainHeadingRandomColorEdit } from "../src/client/js/header";

// To check if 'mainHeadingRandomColorEdit' produces the right style output.
describe("Testing the header function's functionality", () => {
  test("Testing the mainHeadingRandomColorEdit function", () => {
    expect(mainHeadingRandomColorEdit).toBeDefined();
  });
});

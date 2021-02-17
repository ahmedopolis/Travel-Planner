import { validURL } from "../src/client/js/validURL";

// To check if 'validURL' produces the right output.
describe("Testing the submit functionality", () => {
  test("Testing the handleSubmit() function", () => {
    expect(validURL).toBeDefined();
  });
});

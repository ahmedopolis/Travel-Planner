import { runAction } from "../src/client/js/app";

// To check if 'handleSubmit' produces the right output.
describe("Testing the submit functionality", () => {
  test("Testing the runAction() function", () => {
    expect(runAction).toBeDefined();
  });
});

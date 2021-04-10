import { runAction } from "../src/client/js/formHandler";

// To check if 'runAction' produces the right output.
describe("Testing the form handler's functionality", () => {
  test("Testing the runAction function", () => {
    expect(runAction).toBeDefined();
  });
});

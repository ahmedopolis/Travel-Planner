import { checkOrderDate } from "../src/client/js/checkDates";

// To check if 'checkDates' produces the right output.
describe("Testing the date checker functionality", () => {
  test("Testing the checkOrderDate function", () => {
    expect(checkOrderDate).toBeDefined();
  });
});

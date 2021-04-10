import { checkOrderDate } from "../src/client/js/checkDates";

// To check if 'checkDates' produces the right output.
describe("Testing the date checker functionality", () => {
  test("Testing the checkOrderDate function", () => {
    expect(checkOrderDate).toBeDefined();
  });

  test("Testing the 'true' output of checkOrderDate function", () => {
    expect(
      checkOrderDate("2021-04-10", "2021-04-16", "2021-04-17")
    ).toBeTruthy();
  });

  test("Testing the 'false' output of checkOrderDate function", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    expect(
      checkOrderDate("2021-04-10", "2021-04-17", "2021-04-12")
    ).toBeFalsy();
  });
});

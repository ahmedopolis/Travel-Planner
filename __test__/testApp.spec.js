// Fetch 'app.js' and the 'supertest' module
const request = require("supertest");
const app = require("../src/server/app");

// Test the GET method for the mock api
describe("Test the root path for the mock Api", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/Test")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

// Test the GET method for the travel data
describe("Test the root path for the travel data", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/apiData")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

// Fetch 'app.js' and the 'supertest' module
const supertest = require("supertest");
const request = require("supertest");
const regeneratorRuntime = require("regenerator-runtime");

const app = require("../src/server/app");

// Test the GET method for the mock api and the travel data
describe("Test the root path for both folders", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/Test")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the GET method", (done) => {
    request(app)
      .get("/apiData")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

// Test the POST method for the coordinates data
test("Test the POST routes for GeoNames response", async (done) => {
  const travelCoordinatesData = {
    name: "Mataram",
    country: "Indonesia",
    latitude: "-8.58333",
    longitude: "116.11667",
  };

  await supertest(app)
    .post("/coordinates")
    .send(travelCoordinatesData)
    .expect(200)
    .then((response) => {
      expect(response.body.name).toBe(travelCoordinatesData.name);
      expect(response.body.country).toBe(travelCoordinatesData.country);
      expect(response.body.latitude).toEqual(travelCoordinatesData.latitude);
      expect(response.body.longitude).toEqual(travelCoordinatesData.longitude);
      done();
    });
});

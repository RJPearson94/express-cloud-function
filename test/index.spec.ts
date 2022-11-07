import supertest from "supertest";

process.env.LOG_LEVEL = "silent";

import { handler } from "../src";

jest.mock("../src/utils/tracing", () => ({
  instrumentTracing: jest.fn(),
}));

describe("Express Cloud function", () => {
  describe("When I make a post request with a session parameter", () => {
    let response: supertest.Response;

    beforeAll(async () => {
      response = await supertest(handler)
        .post("/")
        .send({
          sessionInfo: {
            parameters: {
              hello: "world",
            },
          },
        });
    });

    test("Then I expect a 200 response status code", () => {
      expect(response.status).toEqual(200);
    });

    test("And the body contains a name session parameter", () => {
      expect(response.body).toEqual({
        sessionInfo: {
          parameters: {
            name: "post",
          },
        },
      });
    });
  });

  describe("When I make a get request", () => {
    let response: supertest.Response;

    beforeAll(async () => {
      response = await supertest(handler).get("/");
    });

    test("Then I expect a 200 response status code", () => {
      expect(response.status).toEqual(200);
    });

    test("And the body to be an empty object", () => {
      expect(response.body).toEqual({});
    });
  });

  describe("When I make a post request without the session parameters object", () => {
    let response: supertest.Response;

    beforeAll(async () => {
      response = await supertest(handler).post("/").send({
        sessionInfo: {},
      });
    });

    test("Then I expect a 400 response status code", () => {
      expect(response.status).toEqual(400);
    });

    test("And the body contains the validation errors", () => {
      expect(response.body).toEqual({
        message: "Request failed validation",
        details: [
          {
            instancePath: "/sessionInfo",
            keyword: "required",
            message: "must have required property 'parameters'",
            params: {
              missingProperty: "parameters",
            },
            schemaPath: "#/properties/sessionInfo/required",
          },
        ],
      });
    });
  });

  describe("When I make a put request", () => {
    let response: supertest.Response;

    beforeAll(async () => {
      response = await supertest(handler).put("/").send({
        hello: "world",
      });
    });

    test("Then I expect a 405 response status code", () => {
      expect(response.status).toEqual(405);
    });

    test("And the body contains the message, method not allowed", () => {
      expect(response.body).toEqual({
        message: "Method Not Allowed",
      });
    });
  });
});

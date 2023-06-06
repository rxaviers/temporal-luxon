import { TimeZone } from "../src/index.mjs";
import { expect } from "chai";

describe("TimeZone", function () {
  describe("constructor", function () {
    it("should create a TimeZone instance with the provided identifier", function () {
      const timeZone = new TimeZone("America/New_York");
      expect(timeZone.id).to.equal("America/New_York");
    });
  });

  describe("toString", function () {
    it("should return the identifier of the TimeZone instance", function () {
      const timeZone = new TimeZone("Europe/London");
      expect(timeZone.toString()).to.equal("Europe/London");
    });
  });

  describe("toJSON", function () {
    it("should return the identifier of the TimeZone instance", function () {
      const timeZone = new TimeZone("Asia/Tokyo");
      expect(timeZone.toJSON()).to.equal("Asia/Tokyo");
    });
  });
});

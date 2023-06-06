import { Instant, ZonedDateTime } from "../src/index.mjs";
import { expect } from "chai";

describe("Instant", function () {
  describe("compare", function () {
    it("should return -1 when a < b", function () {
      const a = new Instant(1000);
      const b = new Instant(2000);
      const result = Instant.compare(a, b);
      expect(result).to.equal(-1);
    });

    it("should return 0 when a = b", function () {
      const a = new Instant(1000);
      const b = new Instant(1000);
      const result = Instant.compare(a, b);
      expect(result).to.equal(0);
    });

    it("should return 1 when a > b", function () {
      const a = new Instant(2000);
      const b = new Instant(1000);
      const result = Instant.compare(a, b);
      expect(result).to.equal(1);
    });

    it("should convert a and b to Instant if they have toInstant method", function () {
      const a = {
        toInstant: () => new Instant(1000),
      };
      const b = {
        toInstant: () => new Instant(2000),
      };
      const result = Instant.compare(a, b);
      expect(result).to.equal(-1);
    });
  });

  describe("from", function () {
    it("should create an Instant from an ISO 8601 string", function () {
      const isoString = "2023-06-06T12:00:00.000Z";
      const expectedMilliseconds = new Date(isoString).getTime();
      const instant = Instant.from(isoString);
      expect(instant).to.be.an.instanceof(Instant);
      expect(instant.epochMilliseconds).to.equal(expectedMilliseconds);
    });

    it("should throw a RangeError for invalid ISO 8601 string", function () {
      const invalidISOString = "invalid";
      expect(() => Instant.from(invalidISOString)).to.throw(RangeError);
    });

    it("should throw a TypeError for unsupported types", function () {
      const unsupportedType = true;
      expect(() => Instant.from(unsupportedType)).to.throw(TypeError);
    });

    it("should throw a TypeError for unsupported types (a number)", function () {
      const unsupportedType = 1000;
      expect(() => Instant.from(unsupportedType)).to.throw(TypeError);
    });

    it("should create an Instant from another Instant", function () {
      const instant = Instant.fromEpochMilliseconds(1000);
      const anotherInstant = Instant.from(instant);
      expect(anotherInstant).to.be.an.instanceof(Instant);
      expect(anotherInstant).to.not.equal(instant);
      expect(anotherInstant.epochMilliseconds).to.equal(
        instant.epochMilliseconds
      );
    });
  });

  describe("fromEpochMilliseconds", function () {
    it("should create an Instant from epoch milliseconds", function () {
      const milliseconds = 1000;
      const instant = Instant.fromEpochMilliseconds(milliseconds);
      expect(instant).to.be.an.instanceof(Instant);
      expect(instant.epochMilliseconds).to.equal(milliseconds);
    });
  });

  describe("toZonedDateTimeISO", function () {
    it("should return a ZonedDateTime instance", function () {
      const instant = Instant.fromEpochMilliseconds(1000);
      const timeZone = "America/New_York";
      const result = instant.toZonedDateTimeISO(timeZone);
      expect(result).to.be.an.instanceof(ZonedDateTime);
    });
  });

  describe("toString", function () {
    it("should return an ISO string representation of the Instant", function () {
      const milliseconds = 1000;
      const instant = Instant.fromEpochMilliseconds(milliseconds);
      const expectedString = new Date(milliseconds).toISOString();
      const result = instant.toString();
      expect(result).to.equal(expectedString);
    });
  });
});

import { PlainDateTime, TimeZone, ZonedDateTime } from "../src/index.mjs";
import { expect } from "chai";

describe("PlainDateTime", function () {
  describe("compare", function () {
    it("should compare two PlainDateTime objects", function () {
      const dt1 = new PlainDateTime(2023, 6, 6, 12, 0, 0, 0);
      const dt2 = new PlainDateTime(2023, 6, 6, 13, 0, 0, 0);
      const result = PlainDateTime.compare(dt1, dt2);
      expect(result).to.equal(-1);
    });
  });

  describe("from", function () {
    it("should create a PlainDateTime from a string", function () {
      const dt = PlainDateTime.from("2023-06-06T12:00:00");
      expect(dt).to.be.an.instanceof(PlainDateTime);
      expect(dt.year).to.equal(2023);
      expect(dt.month).to.equal(6);
      expect(dt.day).to.equal(6);
      expect(dt.hour).to.equal(12);
      expect(dt.minute).to.equal(0);
      expect(dt.second).to.equal(0);
      expect(dt.millisecond).to.equal(0);
    });

    it("should create a PlainDateTime from an object", function () {
      const dt = PlainDateTime.from({
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
      });
      expect(dt).to.be.an.instanceof(PlainDateTime);
      expect(dt.year).to.equal(2023);
      expect(dt.month).to.equal(6);
      expect(dt.day).to.equal(6);
      expect(dt.hour).to.equal(12);
      expect(dt.minute).to.equal(0);
      expect(dt.second).to.equal(0);
      expect(dt.millisecond).to.equal(0);
    });
  });

  describe("add", function () {
    it("should add a duration", function () {
      const dt = PlainDateTime.from("2015-12-07T03:24:30");
      const duration = {
        hours: 6,
        minutes: 35,
        seconds: 30,
        milliseconds: 3500,
      };
      const result = dt.add(duration);
      expect(result).to.be.an.instanceof(PlainDateTime);
      expect(result.year).to.equal(2015);
      expect(result.month).to.equal(12);
      expect(result.day).to.equal(7);
      expect(result.hour).to.equal(10);
      expect(result.minute).to.equal(0);
      expect(result.second).to.equal(3);
      expect(result.millisecond).to.equal(500);
    });
  });

  describe("with", function () {
    it("should set properties of a PlainDateTime", function () {
      const dt = new PlainDateTime(2023, 6, 6, 12, 0, 0, 0);
      const dateTimeLike = { hour: 13, minute: 30 };
      const result = dt.with(dateTimeLike);
      expect(result).to.be.an.instanceof(PlainDateTime);
      expect(result.year).to.equal(2023);
      expect(result.month).to.equal(6);
      expect(result.day).to.equal(6);
      expect(result.hour).to.equal(13);
      expect(result.minute).to.equal(30);
      expect(result.second).to.equal(0);
      expect(result.millisecond).to.equal(0);
    });
  });

  describe("toZonedDateTime", function () {
    it("should convert a PlainDateTime to a ZonedDateTime", function () {
      const dt = new PlainDateTime(2023, 6, 6, 12, 0, 0, 0);
      const timeZone = new TimeZone("America/New_York");
      const result = dt.toZonedDateTime(timeZone);
      expect(result).to.be.an.instanceof(ZonedDateTime);
      expect(result.epochMilliseconds).to.be.a("number");
      expect(result.timeZone).to.equal(timeZone);
    });

    it("should throw an error if timeZone is missing", function () {
      const dt = new PlainDateTime(2023, 6, 6, 12, 0, 0, 0);
      expect(() => dt.toZonedDateTime()).to.throw(TypeError);
    });
  });

  describe("toString", function () {
    it("should convert a PlainDateTime to a string", function () {
      const dt = new PlainDateTime(2023, 6, 6, 12, 0, 0, 0);
      const result = dt.toString();
      expect(result).to.be.a("string");
      expect(result).to.equal("2023-06-06T12:00:00.000");
    });
  });
});

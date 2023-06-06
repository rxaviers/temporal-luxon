import { PlainTime, PlainDateTime } from "../src/index.mjs";
import { expect } from "chai";

describe("PlainTime", function () {
  describe("compare", function () {
    it("should compare two PlainTime objects correctly", function () {
      const time1 = new PlainTime(10, 30, 0, 0);
      const time2 = new PlainTime(12, 0, 0, 0);
      expect(PlainTime.compare(time1, time2)).to.equal(-1);
      expect(PlainTime.compare(time2, time1)).to.equal(1);
      expect(PlainTime.compare(time1, time1)).to.equal(0);
    });
  });

  describe("from", function () {
    it("should create a PlainTime object from a string", function () {
      const time = PlainTime.from("12:30:00.000");
      expect(time.hour).to.equal(12);
      expect(time.minute).to.equal(30);
      expect(time.second).to.equal(0);
      expect(time.millisecond).to.equal(0);
    });

    it("should create a PlainTime object from an object", function () {
      const time = PlainTime.from({
        hour: 12,
        minute: 30,
        second: 0,
        millisecond: 0,
      });
      expect(time.hour).to.equal(12);
      expect(time.minute).to.equal(30);
      expect(time.second).to.equal(0);
      expect(time.millisecond).to.equal(0);
    });
  });

  describe("add", function () {
    it("should add a duration to the PlainTime object", function () {
      const time = new PlainTime(10, 30, 0, 0);
      const duration = { hours: 2, minutes: 15 };
      const result = time.add(duration);
      expect(result.hour).to.equal(12);
      expect(result.minute).to.equal(45);
      expect(result.second).to.equal(0);
      expect(result.millisecond).to.equal(0);
    });
  });

  describe("with", function () {
    it("should set the properties of the PlainTime object with the provided timeLike object", function () {
      const time = new PlainTime(10, 30, 0, 0);
      const timeLike = { hour: 12, minute: 45 };
      const result = time.with(timeLike);
      expect(result.hour).to.equal(12);
      expect(result.minute).to.equal(45);
      expect(result.second).to.equal(0);
      expect(result.millisecond).to.equal(0);
    });
  });

  describe("toPlainDateTime", function () {
    it("should convert the PlainTime object to a PlainDateTime object with the provided date", function () {
      const date = new PlainDateTime(2023, 6, 1, 0, 0, 0, 0);
      const time = new PlainTime(10, 30, 0, 0);
      const result = time.toPlainDateTime(date);
      expect(result.year).to.equal(2023);
      expect(result.month).to.equal(6);
      expect(result.day).to.equal(1);
      expect(result.hour).to.equal(10);
      expect(result.minute).to.equal(30);
      expect(result.second).to.equal(0);
      expect(result.millisecond).to.equal(0);
    });
  });

  describe("toZonedDateTime", function () {
    it("should convert the PlainTime object to a ZonedDateTime object with the provided timeZone and plainDate", function () {
      const timeZone = "America/New_York";
      const plainDate = new PlainDateTime(2023, 6, 1, 0, 0, 0, 0);
      const time = new PlainTime(10, 30, 0, 0);
      const result = time.toZonedDateTime({ timeZone, plainDate });
      expect(result.epochMilliseconds).to.be.a("number");
      expect(result.timeZone.toString()).to.equal(timeZone);
    });

    it("should throw an error if timeZone is missing", function () {
      const plainDate = new PlainDateTime(2023, 6, 1, 0, 0, 0, 0);
      const time = new PlainTime(10, 30, 0, 0);
      expect(() => time.toZonedDateTime({ plainDate })).to.throw(
        TypeError,
        "Missing timeZone"
      );
    });

    it("should throw an error if plainDate is missing", function () {
      const timeZone = "America/New_York";
      const time = new PlainTime(10, 30, 0, 0);
      expect(() => time.toZonedDateTime({ timeZone })).to.throw(
        TypeError,
        "Missing plainDate"
      );
    });
  });

  describe("toString", function () {
    it("should convert the PlainTime object to an ISO time string without milliseconds and offset", function () {
      const time = new PlainTime(10, 30, 0, 0);
      const result = time.toString();
      expect(result).to.equal("10:30:00");
    });
  });
});

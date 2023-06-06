import {
  ZonedDateTime,
  PlainDate,
  PlainDateTime,
  Instant,
} from "../src/index.mjs";
import { expect } from "chai";

describe("ZonedDateTime", function () {
  describe("from", function () {
    it("should create a ZonedDateTime instance from an object", function () {
      const dateTimeObject = {
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeZone: "America/New_York",
      };
      const zonedDateTime = ZonedDateTime.from(dateTimeObject);

      expect(zonedDateTime).to.be.an.instanceof(ZonedDateTime);
      expect(zonedDateTime.year).to.equal(2023);
      expect(zonedDateTime.month).to.equal(6);
      expect(zonedDateTime.day).to.equal(6);
      expect(zonedDateTime.hour).to.equal(12);
      expect(zonedDateTime.minute).to.equal(0);
      expect(zonedDateTime.second).to.equal(0);
      expect(zonedDateTime.millisecond).to.equal(0);
      expect(zonedDateTime.timeZone).to.equal("America/New_York");
    });
  });

  describe("getters", function () {
    it("should return the correct values for each getter", function () {
      const dateTimeObject = {
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeZone: "America/New_York",
      };
      const zonedDateTime = ZonedDateTime.from(dateTimeObject);

      expect(zonedDateTime.year).to.equal(2023);
      expect(zonedDateTime.month).to.equal(6);
      expect(zonedDateTime.day).to.equal(6);
      expect(zonedDateTime.hour).to.equal(12);
      expect(zonedDateTime.minute).to.equal(0);
      expect(zonedDateTime.second).to.equal(0);
      expect(zonedDateTime.millisecond).to.equal(0);
      expect(zonedDateTime.dayOfWeek).to.equal(2);
      expect(zonedDateTime.weekOfYear).to.equal(23);
      expect(zonedDateTime.daysInWeek).to.equal(7);
      expect(zonedDateTime.daysInMonth).to.equal(30);
      expect(zonedDateTime.daysInYear).to.equal(365);
      expect(zonedDateTime.inLeapYear).to.be.false;
    });
  });

  describe("add", function () {
    it("should add the specified duration to the ZonedDateTime", function () {
      const dateTimeObject = {
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeZone: "America/New_York",
      };
      const zonedDateTime = ZonedDateTime.from(dateTimeObject);
      const duration = {
        years: 1,
        months: 3,
        days: 10,
        hours: 2,
        minutes: 30,
        seconds: 15,
        milliseconds: 500,
      };
      const result = zonedDateTime.add(duration);

      expect(result).to.be.an.instanceof(ZonedDateTime);
      expect(result.year).to.equal(2024);
      expect(result.month).to.equal(9);
      expect(result.day).to.equal(16);
      expect(result.hour).to.equal(14);
      expect(result.minute).to.equal(30);
      expect(result.second).to.equal(15);
      expect(result.millisecond).to.equal(500);
      expect(result.timeZone).to.equal("America/New_York");
    });
  });

  describe("with", function () {
    it("should create a new ZonedDateTime instance with the specified properties", function () {
      const dateTimeObject = {
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeZone: "America/New_York",
      };
      const zonedDateTime = ZonedDateTime.from(dateTimeObject);
      const newDateTimeObject = {
        hour: 15,
        minute: 30,
        second: 45,
      };
      const result = zonedDateTime.with(newDateTimeObject);

      expect(result).to.be.an.instanceof(ZonedDateTime);
      expect(result.year).to.equal(2023);
      expect(result.month).to.equal(6);
      expect(result.day).to.equal(6);
      expect(result.hour).to.equal(15);
      expect(result.minute).to.equal(30);
      expect(result.second).to.equal(45);
      expect(result.millisecond).to.equal(0);
      expect(result.timeZone).to.equal("America/New_York");
    });
  });

  describe("toPlainDate", function () {
    it("should return a PlainDate instance with the same date", function () {
      const dateTimeObject = {
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeZone: "America/New_York",
      };
      const zonedDateTime = ZonedDateTime.from(dateTimeObject);
      const plainDate = zonedDateTime.toPlainDate();

      expect(plainDate).to.be.an.instanceof(PlainDate);
      expect(plainDate.year).to.equal(2023);
      expect(plainDate.month).to.equal(6);
      expect(plainDate.day).to.equal(6);
    });
  });

  describe("toPlainDateTime", function () {
    it("should return a PlainDateTime instance with the same date and time", function () {
      const dateTimeObject = {
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeZone: "America/New_York",
      };
      const zonedDateTime = ZonedDateTime.from(dateTimeObject);
      const plainDateTime = zonedDateTime.toPlainDateTime();

      expect(plainDateTime).to.be.an.instanceof(PlainDateTime);
      expect(plainDateTime.year).to.equal(2023);
      expect(plainDateTime.month).to.equal(6);
      expect(plainDateTime.day).to.equal(6);
      expect(plainDateTime.hour).to.equal(12);
      expect(plainDateTime.minute).to.equal(0);
      expect(plainDateTime.second).to.equal(0);
      expect(plainDateTime.millisecond).to.equal(0);
    });
  });

  describe("toInstant", function () {
    it("should return an Instant instance with the same epoch milliseconds", function () {
      const dateTimeObject = {
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeZone: "America/New_York",
      };
      const zonedDateTime = ZonedDateTime.from(dateTimeObject);
      const instant = zonedDateTime.toInstant();

      expect(instant).to.be.an.instanceof(Instant);
      expect(instant.epochMilliseconds).to.equal(
        zonedDateTime.epochMilliseconds
      );
    });
  });

  describe("toString", function () {
    it("should return a string representation of the ZonedDateTime", function () {
      const dateTimeObject = {
        year: 2023,
        month: 6,
        day: 6,
        hour: 12,
        minute: 0,
        second: 0,
        millisecond: 0,
        timeZone: "America/New_York",
      };
      const zonedDateTime = ZonedDateTime.from(dateTimeObject);
      const result = zonedDateTime.toString();

      expect(result).to.be.a("string");
      expect(result).to.equal(
        "2023-06-06T12:00:00.000-04:00[America/New_York]"
      );
    });
  });
});

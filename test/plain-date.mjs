import {
  PlainDate,
  PlainDateTime,
  PlainTime,
  ZonedDateTime,
  TimeZone,
} from "../src/index.mjs";
import { expect } from "chai";

describe("PlainDate", function () {
  describe("compare", function () {
    it("should return -1 when the first date is earlier", function () {
      const date1 = new PlainDate(2023, 1, 1);
      const date2 = new PlainDate(2023, 1, 2);
      const result = PlainDate.compare(date1, date2);
      expect(result).to.equal(-1);
    });

    it("should return 0 when both dates are the same", function () {
      const date1 = new PlainDate(2023, 1, 1);
      const date2 = new PlainDate(2023, 1, 1);
      const result = PlainDate.compare(date1, date2);
      expect(result).to.equal(0);
    });

    it("should return 1 when the first date is later", function () {
      const date1 = new PlainDate(2023, 1, 2);
      const date2 = new PlainDate(2023, 1, 1);
      const result = PlainDate.compare(date1, date2);
      expect(result).to.equal(1);
    });
  });

  describe("from", function () {
    it("should create a PlainDate from a string", function () {
      const dateString = "2023-06-01";
      const result = PlainDate.from(dateString);
      expect(result).to.be.an.instanceof(PlainDate);
      expect(result.year).to.equal(2023);
      expect(result.month).to.equal(6);
      expect(result.day).to.equal(1);
    });

    it("should create a PlainDate from an object", function () {
      const dateObject = { year: 2023, month: 6, day: 1 };
      const result = PlainDate.from(dateObject);
      expect(result).to.be.an.instanceof(PlainDate);
      expect(result.year).to.equal(2023);
      expect(result.month).to.equal(6);
      expect(result.day).to.equal(1);
    });
  });

  describe("add", function () {
    it("should add a duration to the PlainDate", function () {
      const date = new PlainDate(2023, 1, 1);
      const duration = { days: 7 };
      const result = date.add(duration);
      expect(result).to.be.an.instanceof(PlainDate);
      expect(result.year).to.equal(2023);
      expect(result.month).to.equal(1);
      expect(result.day).to.equal(8);
    });
  });

  describe("with", function () {
    it("should set the properties of the PlainDate", function () {
      const date = new PlainDate(2023, 1, 1);
      const dateLike = { year: 2024, month: 2, day: 3 };
      const result = date.with(dateLike);
      expect(result).to.be.an.instanceof(PlainDate);
      expect(result.year).to.equal(2024);
      expect(result.month).to.equal(2);
      expect(result.day).to.equal(3);
    });
  });

  describe("toPlainDateTime", function () {
    it("should convert PlainDate to PlainDateTime", function () {
      const date = new PlainDate(2023, 1, 1);
      const time = { hour: 12, minute: 0, second: 0, millisecond: 0 };
      const result = date.toPlainDateTime(time);
      expect(result).to.be.an.instanceof(PlainDateTime);
      expect(result.year).to.equal(2023);
      expect(result.month).to.equal(1);
      expect(result.day).to.equal(1);
      expect(result.hour).to.equal(12);
      expect(result.minute).to.equal(0);
      expect(result.second).to.equal(0);
      expect(result.millisecond).to.equal(0);
    });

    it("should throw TypeError when time is a string", function () {
      const date = new PlainDate(2023, 1, 1);
      const time = "12:00:00";
      expect(() => date.toPlainDateTime(time)).to.throw(TypeError);
    });
  });

  describe("toZonedDateTime", function () {
    it("should convert PlainDate to ZonedDateTime with timeZone and plainTime", function () {
      const date = new PlainDate(2023, 1, 1);
      const timeZone = new TimeZone("America/New_York");
      const plainTime = new PlainTime(12, 0, 0, 0);
      const result = date.toZonedDateTime({ timeZone, plainTime });
      expect(result).to.be.an.instanceof(ZonedDateTime);
      expect(result.epochMilliseconds).to.be.a("number");
      expect(result.timeZone).to.equal(timeZone);
    });

    it("should throw TypeError when timeZone is missing", function () {
      const date = new PlainDate(2023, 1, 1);
      const plainTime = new PlainTime(12, 0, 0, 0);
      expect(() => date.toZonedDateTime({ plainTime })).to.throw(TypeError);
    });

    it("should create PlainTime with default value when plainTime is missing", function () {
      const date = new PlainDate(2023, 1, 1);
      const timeZone = new TimeZone("America/New_York");
      const result = date.toZonedDateTime({ timeZone });
      expect(result).to.be.an.instanceof(ZonedDateTime);
      expect(result.epochMilliseconds).to.be.a("number");
      expect(result.timeZone).to.equal(timeZone);
    });
  });

  describe("toString", function () {
    it("should return the ISO string representation of the PlainDate", function () {
      const date = new PlainDate(2023, 1, 1);
      const result = date.toString();
      expect(result).to.be.a("string");
      expect(result).to.equal("2023-01-01");
    });
  });
});

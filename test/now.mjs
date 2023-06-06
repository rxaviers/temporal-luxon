import {
  Now,
  PlainDate,
  PlainTime,
  PlainDateTime,
  Instant,
  TimeZone,
  ZonedDateTime,
} from "../src/index.mjs";
import { expect } from "chai";

describe("Now", function () {
  describe("timeZone", function () {
    it("should return a timeZone instance", function () {
      expect(Now.timeZone()).to.be.an.instanceof(TimeZone);
    });
  });

  describe("plainDateISO", function () {
    it("should return a plainDateISO instance", function () {
      expect(Now.plainDateISO()).to.be.an.instanceof(PlainDate);
    });
  });

  describe("plainTimeISO", function () {
    it("should return a plainTimeISO instance", function () {
      expect(Now.plainTimeISO()).to.be.an.instanceof(PlainTime);
    });
  });

  describe("plainDateTimeISO", function () {
    it("should return a plainDateTimeISO instance", function () {
      expect(Now.plainDateTimeISO()).to.be.an.instanceof(PlainDateTime);
    });
  });

  describe("instant", function () {
    it("should return an instant instance", function () {
      expect(Now.instant()).to.be.an.instanceof(Instant);
    });
  });

  describe("zonedDateTimeISO", function () {
    it("should return a zonedDateTimeISO instance", function () {
      expect(Now.zonedDateTimeISO()).to.be.an.instanceof(ZonedDateTime);
    });
  });
});

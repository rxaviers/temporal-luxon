import { Instant } from "../src/index.mjs";
import { expect } from "chai";

describe("Instant", function () {
  describe(".from", function () {
    it("should throw on invalid input", function () {
      expect(() => Instant.from(NaN)).to.throw(RangeError);
      expect(() => Instant.from("x")).to.throw(RangeError);
    });
  });
});

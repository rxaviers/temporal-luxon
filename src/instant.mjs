import { ZonedDateTime } from "./index.mjs";

export class Instant {
  static compare(a, b) {
    if (a.toInstant) {
      a = a.toInstant();
    }
    if (b.toInstant) {
      b = b.toInstant();
    }

    const diff = a.epochMilliseconds - b.epochMilliseconds;

    // Returns: −1, 0, or 1.
    return Math.min(1, Math.max(diff, -1));
  }

  static from(thing) {
    if (typeof thing === "number") {
      const instant = new Instant(thing);
      if (isNaN(instant.epochMilliseconds)) {
        throw new RangeError("Invalid milliseconds");
      }
      return instant;
    } else if (typeof thing === "string") {
      const instant = new Instant(new Date(thing).getTime());
      if (isNaN(instant.epochMilliseconds)) {
        throw new RangeError("Invalid ISO 8601");
      }
      return instant;
    }
    throw new TypeError("Type not implememnted");
  }

  static fromEpochMilliseconds(epochMilliseconds) {
    return new Instant(epochMilliseconds);
  }

  // Note: Temporal.Instant constructor actually takes nanoseconds bigint.
  constructor(epochMilliseconds) {
    this.epochMilliseconds = epochMilliseconds;
  }

  toZonedDateTimeISO(timeZone) {
    return new ZonedDateTime(this.epochMilliseconds, timeZone);
  }

  toString() {
    return new Date(this.epochMilliseconds).toISOString();
  }
}

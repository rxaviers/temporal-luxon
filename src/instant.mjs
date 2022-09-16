import { DateTime as LuxonDateTime } from "./luxon.mjs";
import { PlainDate, PlainDateTime, ZonedDateTime } from "./index.mjs";

export class Instant {
  static compare(a, b) {
    if (a.toInstant) {
      a = a.toInstant();
    }
    if (b.toInstant) {
      b = b.toInstant();
    }

    return a.epochMilliseconds - b.epochMilliseconds;
  }

  static from(thing) {
    if (typeof thing === "number") {
      return new Instant(thing);
    } else if (typeof thing === "string") {
      return new Instant(new Date(thing).getTime());
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

  toPlainDate() {
    const luxon = LuxonDateTime.fromMillis(this.epochMilliseconds);
    const { year, month, day } = luxon;

    return new PlainDate(year, month, day);
  }

  toPlainDateTime() {
    const luxon = LuxonDateTime.fromMillis(this.epochMilliseconds);
    const { year, month, day, hour, minute, second, millisecond } = luxon;

    return new PlainDateTime(
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    );
  }

  toZonedDateTimeISO(timeZone) {
    return new ZonedDateTime(this.epochMilliseconds, timeZone);
  }

  toString() {
    return new Date(this.epochMilliseconds).toISOString();
  }
}

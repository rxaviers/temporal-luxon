import { PlainDateTime, ZonedDateTime } from "./index.mjs";
import { DateTime as LuxonDateTime } from "./luxon.mjs";

export class PlainTime {
  static compare(a, b) {
    if (a.toPlainTime) {
      a = a.toPlainTime();
    }
    if (b.toPlainTime) {
      b = b.toPlainTime();
    }
    const getLuxon = (i) => {
      const { hour, minute, second, millisecond } = i;

      return LuxonDateTime.fromObject({ hour, minute, second, millisecond });
    };
    const luxonA = getLuxon(a);
    const luxonB = getLuxon(b);
    const diff = luxonA.diff(luxonB, "millisecond").milliseconds;

    // Returns: −1, 0, or 1.
    return Math.min(1, Math.max(diff, -1));
  }

  static from(thing) {
    let luxon;
    if (typeof thing === "string") {
      luxon = LuxonDateTime.fromISO(thing);
    } else {
      luxon = LuxonDateTime.fromObject(thing);
    }
    const { hour, minute, second, millisecond } = luxon;

    return new PlainTime(hour, minute, second, millisecond);
  }

  constructor(isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0) {
    this.hour = isoHour;
    this.minute = isoMinute;
    this.second = isoSecond;
    this.millisecond = isoMillisecond;
  }

  add(duration) {
    let { hour, minute, second, millisecond } = this;
    const luxon = LuxonDateTime.fromObject({
      hour,
      minute,
      second,
      millisecond,
    }).plus(duration);
    ({ hour, minute, second, millisecond } = luxon);

    return new PlainTime(hour, minute, second, millisecond);
  }

  with(timeLike) {
    let { hour, minute, second, millisecond } = this;
    const luxon = LuxonDateTime.fromObject({
      hour,
      minute,
      second,
      millisecond,
    }).set(timeLike);
    ({ hour, minute, second, millisecond } = luxon);

    return new PlainTime(hour, minute, second, millisecond);
  }

  toPlainDateTime(date) {
    if (typeof time === "string") {
      throw new TypeError("Type not implememnted");
    }
    const { year, month, day } = date;
    const { hour, minute, second, millisecond } = this;

    return PlainDateTime.from({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
    });
  }

  toZonedDateTime({ timeZone, plainDate } = {}) {
    if (!timeZone) {
      throw new TypeError("Missing timeZone");
    }
    if (!plainDate) {
      throw new TypeError("Missing plainDate");
    }
    const { year, month, day } = plainDate;
    const { hour, minute, second, millisecond } = this;
    const epochMilliseconds = LuxonDateTime.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone.toString() }
    )
      .toJSDate()
      .getTime();

    return new ZonedDateTime(epochMilliseconds, timeZone);
  }

  toString() {
    const { hour, minute, second, millisecond } = this;
    const luxon = LuxonDateTime.fromObject({
      hour,
      minute,
      second,
      millisecond,
    });

    return luxon.toISOTime({
      suppressMilliseconds: true,
      includeOffset: false,
    });
  }
}

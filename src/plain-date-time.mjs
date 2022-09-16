import { DateTime as LuxonDateTime } from "./luxon";
import { ZonedDateTime } from "./index.mjs";

export class PlainDateTime {
  static compare(a, b) {
    if (a.toPlainDateTime) {
      a = a.toPlainDateTime();
    }
    if (b.toPlainDateTime) {
      b = b.toPlainDateTime();
    }
    const getLuxon = (i) => {
      const { year, month, day, hour, minute, second, millisecond } = i;

      return LuxonDateTime.fromObject({
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond,
      });
    };
    const luxonA = getLuxon(a);
    const luxonB = getLuxon(b);
    const diff = luxonA.diff(luxonB, "millisecond").milliseconds;

    return diff ? diff / Math.abs(diff) : 0;
  }

  static from(thing) {
    let luxon;
    if (typeof thing === "string") {
      luxon = LuxonDateTime.fromISO(thing);
    } else {
      luxon = LuxonDateTime.fromObject(thing);
    }
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

  constructor(
    isoYear,
    isoMonth,
    isoDay,
    isoHour = 0,
    isoMinute = 0,
    isoSecond = 0,
    isoMillisecond = 0
  ) {
    this.year = isoYear;
    this.month = isoMonth;
    this.day = isoDay;
    this.hour = isoHour;
    this.minute = isoMinute;
    this.second = isoSecond;
    this.millisecond = isoMillisecond;
  }

  add(duration) {
    let { year, month, day, hour, minute, second, millisecond } = this;
    const luxon = LuxonDateTime.fromObject({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
    }).plus(duration);
    ({ year, month, day, hour, minute, second, millisecond } = luxon);

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

  toZonedDateTime({ timeZone } = {}) {
    if (!timeZone) {
      throw new TypeError("Missing timeZone");
    }
    const { year, month, day, hour, minute, second, millisecond } = this;
    const epochMilliseconds = LuxonDateTime.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone }
    )
      .toJSDate()
      .getTime();

    return new ZonedDateTime(epochMilliseconds, timeZone);
  }

  toString() {
    const { year, month, day, hour, minute, second, millisecond } = this;
    const luxon = LuxonDateTime.fromObject({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond,
    });

    return luxon.toISO({ includeOffset: false });
  }
}

import { DateTime as LuxonDateTime } from "./luxon.mjs";
import { PlainDateTime, ZonedDateTime } from "./index.mjs";

export class PlainTime {
  static compare() {
    throw new TypeError("Not yet implememnted");
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

  constructor(isoHour, isoMinute, isoSecond, isoMillisecond) {
    this.hour = isoHour;
    this.minute = isoMinute;
    this.second = isoSecond;
    this.millisecond = isoMillisecond;
  }

  add(duration) {
    let { hour, minute, second, millisecond } = this;
    const luxon = LuxonDateTime.fromObject({ hour, minute, second, millisecond }).plus(duration);
    ({ hour, minute, second, millisecond } = luxon);

    return new PlainTime(hour, minute, second, millisecond);
  }

  toPlainDateTime(date) {
    if (typeof time === "string") {
      throw new TypeError("Type not implememnted");
    }
    const { year, month, day } = date;
    const { hour, minute, second, millisecond } = this;

    return PlainDateTime.from({ year, month, day, hour, minute, second, millisecond });
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
      { zone: timeZone }
    )
      .toJSDate()
      .getTime();

    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
}

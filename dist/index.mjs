// src/instant.mjs
import { DateTime as LuxonDateTime } from "luxon";
var Instant = class {
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
};

// src/now.mjs
import { DateTime as LuxonDateTime2 } from "luxon";
var Now = class {
  static instant() {
    return Instant.from(Date.now());
  }
  static timeZone() {
    return LuxonDateTime2.now().zoneName;
  }
  static zonedDateTimeISO() {
    return new ZonedDateTime(Date.now(), Now.timeZone());
  }
  static plainDateISO() {
    return PlainDate.from(LuxonDateTime2.now().toISODate());
  }
  static plainDateTimeISO() {
    return PlainDateTime.from(
      LuxonDateTime2.now().toISO({ includeOffset: false })
    );
  }
};

// src/plain-date-time.mjs
import { DateTime as LuxonDateTime3 } from "luxon";
var PlainDateTime = class {
  static compare(a, b) {
    if (a.toPlainDateTime) {
      a = a.toPlainDateTime();
    }
    if (b.toPlainDateTime) {
      b = b.toPlainDateTime();
    }
    const getLuxon = (i) => {
      const { year, month, day, hour, minute, second, millisecond } = i;
      return LuxonDateTime3.fromObject({
        year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond
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
      luxon = LuxonDateTime3.fromISO(thing);
    } else {
      luxon = LuxonDateTime3.fromObject(thing);
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
  constructor(isoYear, isoMonth, isoDay, isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0) {
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
    const luxon = LuxonDateTime3.fromObject({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
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
    const epochMilliseconds = LuxonDateTime3.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { year, month, day, hour, minute, second, millisecond } = this;
    const luxon = LuxonDateTime3.fromObject({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    });
    return luxon.toISO({ includeOffset: false });
  }
};

// src/plain-date.mjs
import { DateTime as LuxonDateTime4 } from "luxon";
var PlainDate = class {
  static compare(a, b) {
    if (a.toPlainDate) {
      a = a.toPlainDate();
    }
    if (b.toPlainDate) {
      b = b.toPlainDate();
    }
    const getLuxon = (i) => {
      const { year, month, day } = i;
      return LuxonDateTime4.fromObject({ year, month, day });
    };
    const luxonA = getLuxon(a);
    const luxonB = getLuxon(b);
    const diff = luxonA.diff(luxonB, "day").days;
    return diff ? diff / Math.abs(diff) : 0;
  }
  static from(thing) {
    let luxon;
    if (typeof thing === "string") {
      luxon = LuxonDateTime4.fromISO(thing);
    } else {
      luxon = LuxonDateTime4.fromObject(thing);
    }
    const { year, month, day } = luxon;
    return new PlainDate(year, month, day);
  }
  constructor(isoYear, isoMonth, isoDay) {
    this.year = isoYear;
    this.month = isoMonth;
    this.day = isoDay;
  }
  add(duration) {
    let { year, month, day } = this;
    const luxon = LuxonDateTime4.fromObject({ year, month, day }).plus(duration);
    ({ year, month, day } = luxon);
    return new PlainDate(year, month, day);
  }
  toPlainDateTime(time) {
    if (typeof time === "string") {
      throw new TypeError("Type not implememnted");
    }
    const { year, month, day } = this;
    return PlainDateTime.from({ year, month, day, ...time });
  }
  toInstant() {
    const { year, month, day } = this;
    const epochMilliseconds = LuxonDateTime4.fromObject({ year, month, day }).toJSDate().getTime();
    return new Instant(epochMilliseconds);
  }
  toZonedDateTime({ timeZone } = {}) {
    if (!timeZone) {
      throw new TypeError("Missing timeZone");
    }
    const { year, month, day } = this;
    const epochMilliseconds = LuxonDateTime4.fromObject(
      { year, month, day },
      { zone: timeZone }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { year, month, day } = this;
    const luxon = LuxonDateTime4.fromObject({ year, month, day });
    return luxon.toISODate();
  }
};

// src/plain-time.mjs
var PlainTime = class {
};

// src/zoned-date-time.mjs
import { DateTime as LuxonDateTime5 } from "luxon";
var ZonedDateTime = class {
  static from(item) {
    if (typeof item === "string") {
      throw new TypeError("Not implemented");
    }
    const { timeZone, ...props } = item;
    const instant = Instant.from(
      LuxonDateTime5.fromObject(props, { zone: timeZone }).toISO()
    );
    return new ZonedDateTime(instant.epochMilliseconds, timeZone);
  }
  constructor(epochMilliseconds, timeZone) {
    this.timeZone = timeZone;
    this.epochMilliseconds = epochMilliseconds;
    this.luxonDateTime = LuxonDateTime5.fromMillis(epochMilliseconds, {
      zone: timeZone
    });
  }
  toString() {
    return `${this.luxonDateTime.toISO()}[${this.timeZone}]`;
  }
  get year() {
    return this.luxonDateTime.year;
  }
  get month() {
    return this.luxonDateTime.month;
  }
  get day() {
    return this.luxonDateTime.day;
  }
  get hour() {
    return this.luxonDateTime.hour;
  }
  get minute() {
    return this.luxonDateTime.minute;
  }
  get second() {
    return this.luxonDateTime.second;
  }
  get millisecond() {
    return this.luxonDateTime.millisecond;
  }
  get dayOfWeek() {
    return this.luxonDateTime.weekday;
  }
  get weekOfYear() {
    return this.luxonDateTime.weekNumber;
  }
  get daysInWeek() {
    return 7;
  }
  get daysInMonth() {
    return this.luxonDateTime.daysInMonth;
  }
  get daysInYear() {
    return this.luxonDateTime.daysInYear;
  }
  get inLeapYear() {
    return this.luxonDateTime.isInLeapYear;
  }
  add(duration) {
    return new ZonedDateTime(
      this.luxonDateTime.plus(duration).toMillis(),
      this.timeZone
    );
  }
  toInstant() {
    return new Instant(this.epochMilliseconds);
  }
};
export {
  Instant,
  Now,
  PlainDate,
  PlainDateTime,
  PlainTime,
  ZonedDateTime
};

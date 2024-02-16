// src/instant.mjs
var Instant = class {
  static compare(a, b) {
    if (a.toInstant) {
      a = a.toInstant();
    }
    if (b.toInstant) {
      b = b.toInstant();
    }
    const diff = a.epochMilliseconds - b.epochMilliseconds;
    return Math.min(1, Math.max(diff, -1));
  }
  static from(thing) {
    if (typeof thing === "string") {
      const instant = new Instant(new Date(thing).getTime());
      if (isNaN(instant.epochMilliseconds)) {
        throw new RangeError("Invalid ISO 8601");
      }
      return instant;
    } else if (thing && thing.epochMilliseconds) {
      return Instant.fromEpochMilliseconds(thing.epochMilliseconds);
    }
    throw new TypeError("Type not implememnted");
  }
  static fromEpochMilliseconds(epochMilliseconds) {
    return new Instant(epochMilliseconds);
  }
  constructor(epochMilliseconds) {
    this.epochMilliseconds = epochMilliseconds;
  }
  toZonedDateTimeISO(timeZone) {
    return new ZonedDateTime(this.epochMilliseconds, timeZone);
  }
  toString() {
    return new Date(this.epochMilliseconds).toISOString();
  }
};

// src/luxon.mjs
import { DateTime } from "luxon";

// src/now.mjs
var Now = class {
  static timeZone() {
    return new TimeZone(DateTime.now().zoneName);
  }
  static plainDateISO() {
    return PlainDate.from(DateTime.now().toISODate());
  }
  static plainTimeISO() {
    return PlainTime.from(
      DateTime.now().toISOTime({ includeOffset: false })
    );
  }
  static plainDateTimeISO() {
    return PlainDateTime.from(
      DateTime.now().toISO({ includeOffset: false })
    );
  }
  static instant() {
    return Instant.fromEpochMilliseconds(Date.now());
  }
  static zonedDateTimeISO() {
    return new ZonedDateTime(Date.now(), Now.timeZone());
  }
};

// src/plain-date-time.mjs
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
      return DateTime.fromObject({
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
    return Math.min(1, Math.max(diff, -1));
  }
  static from(thing) {
    let luxon;
    if (typeof thing === "string") {
      luxon = DateTime.fromISO(thing);
    } else {
      luxon = DateTime.fromObject(thing);
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
    const luxon = DateTime.fromObject({
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
  with(dateTimeLike) {
    let { year, month, day, hour, minute, second, millisecond } = this;
    const luxon = DateTime.fromObject({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    }).set(dateTimeLike);
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
  toZonedDateTime(timeZone) {
    if (!timeZone) {
      throw new TypeError("Missing timeZone");
    }
    const { year, month, day, hour, minute, second, millisecond } = this;
    const epochMilliseconds = DateTime.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone.toString() }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { year, month, day, hour, minute, second, millisecond } = this;
    const luxon = DateTime.fromObject({
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
      return DateTime.fromObject({ year, month, day });
    };
    const luxonA = getLuxon(a);
    const luxonB = getLuxon(b);
    const diff = luxonA.diff(luxonB, "day").days;
    return Math.min(1, Math.max(diff, -1));
  }
  static from(thing) {
    let luxon;
    if (typeof thing === "string") {
      luxon = DateTime.fromISO(thing);
    } else {
      luxon = DateTime.fromObject(thing);
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
    const luxon = DateTime.fromObject({ year, month, day }).plus(duration);
    ({ year, month, day } = luxon);
    return new PlainDate(year, month, day);
  }
  with(dateLike) {
    let { year, month, day } = this;
    const luxon = DateTime.fromObject({ year, month, day }).set(dateLike);
    ({ year, month, day } = luxon);
    return new PlainDate(year, month, day);
  }
  toPlainDateTime(time2) {
    if (typeof time2 === "string") {
      throw new TypeError("Type not implememnted");
    }
    const { year, month, day } = this;
    return PlainDateTime.from({ year, month, day, ...time2 });
  }
  toZonedDateTime({ timeZone, plainTime } = {}) {
    if (!timeZone) {
      throw new TypeError("Missing timeZone");
    }
    if (!plainTime) {
      plainTime = new PlainTime(0);
    }
    const { year, month, day } = this;
    const { hour, minute, second, millisecond } = plainTime;
    const epochMilliseconds = DateTime.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone.toString() }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { year, month, day } = this;
    const luxon = DateTime.fromObject({ year, month, day });
    return luxon.toISODate();
  }
};

// src/plain-time.mjs
var PlainTime = class {
  static compare(a, b) {
    if (a.toPlainTime) {
      a = a.toPlainTime();
    }
    if (b.toPlainTime) {
      b = b.toPlainTime();
    }
    const getLuxon = (i) => {
      const { hour, minute, second, millisecond } = i;
      return DateTime.fromObject({ hour, minute, second, millisecond });
    };
    const luxonA = getLuxon(a);
    const luxonB = getLuxon(b);
    const diff = luxonA.diff(luxonB, "millisecond").milliseconds;
    return Math.min(1, Math.max(diff, -1));
  }
  static from(thing) {
    let luxon;
    if (typeof thing === "string") {
      luxon = DateTime.fromISO(thing);
    } else {
      luxon = DateTime.fromObject(thing);
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
    const luxon = DateTime.fromObject({
      hour,
      minute,
      second,
      millisecond
    }).plus(duration);
    ({ hour, minute, second, millisecond } = luxon);
    return new PlainTime(hour, minute, second, millisecond);
  }
  with(timeLike) {
    let { hour, minute, second, millisecond } = this;
    const luxon = DateTime.fromObject({
      hour,
      minute,
      second,
      millisecond
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
      millisecond
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
    const epochMilliseconds = DateTime.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone.toString() }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { hour, minute, second, millisecond } = this;
    const luxon = DateTime.fromObject({
      hour,
      minute,
      second,
      millisecond
    });
    return luxon.toISOTime({
      suppressMilliseconds: true,
      includeOffset: false
    });
  }
};

// src/time-zone.mjs
var TimeZone = class {
  static from() {
    throw new TypeError("Type not implememnted");
  }
  constructor(timeZoneIdentifier) {
    this.id = timeZoneIdentifier;
  }
  getOffsetNanosecondsFor() {
    throw new TypeError("Not implememnted");
  }
  getOffsetStringFor() {
    throw new TypeError("Not implememnted");
  }
  getPlainDateTimeFor() {
    throw new TypeError("Not implememnted");
  }
  getInstantFor() {
    throw new TypeError("Not implememnted");
  }
  getNextTransition() {
    throw new TypeError("Not implememnted");
  }
  getPreviousTransition() {
    throw new TypeError("Not implememnted");
  }
  getPossibleInstantsFor() {
    throw new TypeError("Not implememnted");
  }
  toString() {
    return this.id;
  }
  toJSON() {
    return this.id;
  }
};

// src/zoned-date-time.mjs
var ZonedDateTime = class {
  static from(item2) {
    if (typeof item2 === "string") {
      throw new TypeError("Not implemented");
    }
    const { timeZone, ...props } = item2;
    const instant = Instant.from(
      DateTime.fromObject(props, { zone: timeZone }).toISO()
    );
    return new ZonedDateTime(instant.epochMilliseconds, timeZone);
  }
  constructor(epochMilliseconds, timeZone) {
    this.timeZone = typeof timeZone === "string" ? new TimeZone(timeZone) : timeZone;
    this.epochMilliseconds = epochMilliseconds;
    this.luxonDateTime = DateTime.fromMillis(epochMilliseconds, {
      zone: this.timeZoneId
    });
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
  get timeZoneId() {
    return this.timeZone.toString();
  }
  add(duration) {
    return new ZonedDateTime(
      this.luxonDateTime.plus(duration).toMillis(),
      this.timeZone
    );
  }
  with(zonedDateTimeLike) {
    if (typeof item === "string") {
      throw new TypeError("Not implemented");
    }
    const luxon = this.luxonDateTime.set(zonedDateTimeLike);
    return new ZonedDateTime(luxon.toMillis(), this.timeZone);
  }
  getTimeZone() {
    return this.timeZone;
  }
  toPlainDate() {
    const { year, month, day } = this;
    return new PlainDate(year, month, day);
  }
  toPlainDateTime() {
    const { year, month, day, hour, minute, second, millisecond } = this;
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
  toInstant() {
    return new Instant(this.epochMilliseconds);
  }
  toString(options = {}) {
    const {
      fractionalSecondDigits = "auto",
      smallestUnit,
      offset = "auto"
    } = options;
    let luxon = this.luxonDateTime;
    const luxonOptions = {};
    let timeZoneName = "";
    if (!["auto", 0].includes(fractionalSecondDigits)) {
      throw new TypeError(
        `Not implemented { fractionalSecondDigits: ${fractionalSecondDigits} }`
      );
    }
    if (!smallestUnit && fractionalSecondDigits === 0) {
      luxon = luxon.set({ millisecond: 0 });
      luxonOptions.suppressMilliseconds = true;
    }
    if (options.timeZoneName !== "never") {
      timeZoneName = `[${this.timeZoneId}]`;
    }
    if (offset === "never") {
      luxonOptions.includeOffset = false;
    }
    return `${luxon.toISO(luxonOptions)}${timeZoneName}`;
  }
};
export {
  Instant,
  Now,
  PlainDate,
  PlainDateTime,
  PlainTime,
  TimeZone,
  ZonedDateTime
};

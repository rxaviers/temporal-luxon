// src/luxon.mjs
import luxon from "luxon";
var DateTime = luxon.DateTime;

// src/instant.mjs
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
    const luxon2 = DateTime.fromMillis(this.epochMilliseconds);
    const { year, month, day } = luxon2;
    return new PlainDate(year, month, day);
  }
  toPlainDateTime() {
    const luxon2 = DateTime.fromMillis(this.epochMilliseconds);
    const { year, month, day, hour, minute, second, millisecond } = luxon2;
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
var Now = class {
  static timeZone() {
    return DateTime.now().zoneName;
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
    return Instant.from(Date.now());
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
    return diff ? diff / Math.abs(diff) : 0;
  }
  static from(thing) {
    let luxon2;
    if (typeof thing === "string") {
      luxon2 = DateTime.fromISO(thing);
    } else {
      luxon2 = DateTime.fromObject(thing);
    }
    const { year, month, day, hour, minute, second, millisecond } = luxon2;
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
    const luxon2 = DateTime.fromObject({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    }).plus(duration);
    ({ year, month, day, hour, minute, second, millisecond } = luxon2);
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
    const epochMilliseconds = DateTime.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { year, month, day, hour, minute, second, millisecond } = this;
    const luxon2 = DateTime.fromObject({
      year,
      month,
      day,
      hour,
      minute,
      second,
      millisecond
    });
    return luxon2.toISO({ includeOffset: false });
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
    return diff ? diff / Math.abs(diff) : 0;
  }
  static from(thing) {
    let luxon2;
    if (typeof thing === "string") {
      luxon2 = DateTime.fromISO(thing);
    } else {
      luxon2 = DateTime.fromObject(thing);
    }
    const { year, month, day } = luxon2;
    return new PlainDate(year, month, day);
  }
  constructor(isoYear, isoMonth, isoDay) {
    this.year = isoYear;
    this.month = isoMonth;
    this.day = isoDay;
  }
  add(duration) {
    let { year, month, day } = this;
    const luxon2 = DateTime.fromObject({ year, month, day }).plus(duration);
    ({ year, month, day } = luxon2);
    return new PlainDate(year, month, day);
  }
  toPlainDateTime(time2) {
    if (typeof time2 === "string") {
      throw new TypeError("Type not implememnted");
    }
    const { year, month, day } = this;
    return PlainDateTime.from({ year, month, day, ...time2 });
  }
  toInstant() {
    const { year, month, day } = this;
    const epochMilliseconds = DateTime.fromObject({ year, month, day }).toJSDate().getTime();
    return new Instant(epochMilliseconds);
  }
  toZonedDateTime({ timeZone } = {}) {
    if (!timeZone) {
      throw new TypeError("Missing timeZone");
    }
    const { year, month, day } = this;
    const epochMilliseconds = DateTime.fromObject(
      { year, month, day },
      { zone: timeZone }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { year, month, day } = this;
    const luxon2 = DateTime.fromObject({ year, month, day });
    return luxon2.toISODate();
  }
};

// src/plain-time.mjs
var PlainTime = class {
  static compare() {
    throw new TypeError("Not yet implememnted");
  }
  static from(thing) {
    let luxon2;
    if (typeof thing === "string") {
      luxon2 = DateTime.fromISO(thing);
    } else {
      luxon2 = DateTime.fromObject(thing);
    }
    const { hour, minute, second, millisecond } = luxon2;
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
    const luxon2 = DateTime.fromObject({ hour, minute, second, millisecond }).plus(duration);
    ({ hour, minute, second, millisecond } = luxon2);
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
    const epochMilliseconds = DateTime.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
};

// src/zoned-date-time.mjs
var ZonedDateTime = class {
  static from(item) {
    if (typeof item === "string") {
      throw new TypeError("Not implemented");
    }
    const { timeZone, ...props } = item;
    const instant = Instant.from(
      DateTime.fromObject(props, { zone: timeZone }).toISO()
    );
    return new ZonedDateTime(instant.epochMilliseconds, timeZone);
  }
  constructor(epochMilliseconds, timeZone) {
    this.timeZone = timeZone;
    this.epochMilliseconds = epochMilliseconds;
    this.luxonDateTime = DateTime.fromMillis(epochMilliseconds, {
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

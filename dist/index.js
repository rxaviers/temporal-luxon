var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.mjs
var src_exports = {};
__export(src_exports, {
  Instant: () => Instant,
  Now: () => Now,
  PlainDate: () => PlainDate,
  PlainDateTime: () => PlainDateTime,
  PlainTime: () => PlainTime,
  ZonedDateTime: () => ZonedDateTime
});
module.exports = __toCommonJS(src_exports);

// src/instant.mjs
var import_luxon = require("luxon");
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
    const luxon = import_luxon.DateTime.fromMillis(this.epochMilliseconds);
    const { year, month, day } = luxon;
    return new PlainDate(year, month, day);
  }
  toPlainDateTime() {
    const luxon = import_luxon.DateTime.fromMillis(this.epochMilliseconds);
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
var import_luxon2 = require("luxon");
var Now = class {
  static instant() {
    return Instant.from(Date.now());
  }
  static timeZone() {
    return import_luxon2.DateTime.now().zoneName;
  }
  static zonedDateTimeISO() {
    return new ZonedDateTime(Date.now(), Now.timeZone());
  }
  static plainDateISO() {
    return PlainDate.from(import_luxon2.DateTime.now().toISODate());
  }
  static plainDateTimeISO() {
    return PlainDateTime.from(
      import_luxon2.DateTime.now().toISO({ includeOffset: false })
    );
  }
};

// src/plain-date-time.mjs
var import_luxon3 = require("luxon");
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
      return import_luxon3.DateTime.fromObject({
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
      luxon = import_luxon3.DateTime.fromISO(thing);
    } else {
      luxon = import_luxon3.DateTime.fromObject(thing);
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
    const luxon = import_luxon3.DateTime.fromObject({
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
    const epochMilliseconds = import_luxon3.DateTime.fromObject(
      { year, month, day, hour, minute, second, millisecond },
      { zone: timeZone }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { year, month, day, hour, minute, second, millisecond } = this;
    const luxon = import_luxon3.DateTime.fromObject({
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
var import_luxon4 = require("luxon");
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
      return import_luxon4.DateTime.fromObject({ year, month, day });
    };
    const luxonA = getLuxon(a);
    const luxonB = getLuxon(b);
    const diff = luxonA.diff(luxonB, "day").days;
    return diff ? diff / Math.abs(diff) : 0;
  }
  static from(thing) {
    let luxon;
    if (typeof thing === "string") {
      luxon = import_luxon4.DateTime.fromISO(thing);
    } else {
      luxon = import_luxon4.DateTime.fromObject(thing);
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
    const luxon = import_luxon4.DateTime.fromObject({ year, month, day }).plus(duration);
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
    const epochMilliseconds = import_luxon4.DateTime.fromObject({ year, month, day }).toJSDate().getTime();
    return new Instant(epochMilliseconds);
  }
  toZonedDateTime({ timeZone } = {}) {
    if (!timeZone) {
      throw new TypeError("Missing timeZone");
    }
    const { year, month, day } = this;
    const epochMilliseconds = import_luxon4.DateTime.fromObject(
      { year, month, day },
      { zone: timeZone }
    ).toJSDate().getTime();
    return new ZonedDateTime(epochMilliseconds, timeZone);
  }
  toString() {
    const { year, month, day } = this;
    const luxon = import_luxon4.DateTime.fromObject({ year, month, day });
    return luxon.toISODate();
  }
};

// src/plain-time.mjs
var PlainTime = class {
};

// src/zoned-date-time.mjs
var import_luxon5 = require("luxon");
var ZonedDateTime = class {
  static from(item) {
    if (typeof item === "string") {
      throw new TypeError("Not implemented");
    }
    const { timeZone, ...props } = item;
    const instant = Instant.from(
      import_luxon5.DateTime.fromObject(props, { zone: timeZone }).toISO()
    );
    return new ZonedDateTime(instant.epochMilliseconds, timeZone);
  }
  constructor(epochMilliseconds, timeZone) {
    this.timeZone = timeZone;
    this.epochMilliseconds = epochMilliseconds;
    this.luxonDateTime = import_luxon5.DateTime.fromMillis(epochMilliseconds, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Instant,
  Now,
  PlainDate,
  PlainDateTime,
  PlainTime,
  ZonedDateTime
});

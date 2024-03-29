import { PlainDate, PlainDateTime, Instant, TimeZone } from "./index.mjs";
import { DateTime as LuxonDateTime } from "./luxon.mjs";

export class ZonedDateTime {
  static from(item) {
    if (typeof item === "string") {
      throw new TypeError("Not implemented");
      // timeZone = parse iso IANA tz
      // return new ZonedDateTime(new Date(item).getTime(), timeZone)
    }
    const { timeZone, ...props } = item;
    const instant = Instant.from(
      LuxonDateTime.fromObject(props, { zone: timeZone }).toISO()
    );

    return new ZonedDateTime(instant.epochMilliseconds, timeZone);
  }

  // Note: Temporal.ZonedDateTime constructor takes epochNanoseconds as first argument, not epochMilliseconds.
  constructor(epochMilliseconds, timeZone) {
    this.timeZone =
      typeof timeZone === "string" ? new TimeZone(timeZone) : timeZone;
    this.epochMilliseconds = epochMilliseconds;
    this.luxonDateTime = LuxonDateTime.fromMillis(epochMilliseconds, {
      zone: this.timeZoneId,
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
      offset = "auto",
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
}

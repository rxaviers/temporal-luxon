import { DateTime as LuxonDateTime } from "luxon";
import { Instant } from "./index.mjs";

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
    this.timeZone = timeZone;
    this.epochMilliseconds = epochMilliseconds;
    this.luxonDateTime = LuxonDateTime.fromMillis(epochMilliseconds, {
      zone: timeZone,
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
}

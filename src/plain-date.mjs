import { DateTime as LuxonDateTime } from "./luxon.mjs";
import { PlainDateTime, Instant, ZonedDateTime } from "./index.mjs";

export class PlainDate {
  static compare(a, b) {
    if (a.toPlainDate) {
      a = a.toPlainDate();
    }
    if (b.toPlainDate) {
      b = b.toPlainDate();
    }
    const getLuxon = (i) => {
      const { year, month, day } = i;

      return LuxonDateTime.fromObject({ year, month, day });
    };
    const luxonA = getLuxon(a);
    const luxonB = getLuxon(b);
    const diff = luxonA.diff(luxonB, "day").days;

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
    const luxon = LuxonDateTime.fromObject({ year, month, day }).plus(duration);
    ({ year, month, day } = luxon);

    return new PlainDate(year, month, day);
  }

  with(dateLike) {
    let { year, month, day } = this;
    const luxon = LuxonDateTime.fromObject({ year, month, day }).set(dateLike);
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
    const epochMilliseconds = LuxonDateTime.fromObject({ year, month, day })
      .toJSDate()
      .getTime();

    return new Instant(epochMilliseconds);
  }

  toZonedDateTime({ timeZone } = {}) {
    if (!timeZone) {
      throw new TypeError("Missing timeZone");
    }
    const { year, month, day } = this;
    const epochMilliseconds = LuxonDateTime.fromObject(
      { year, month, day },
      { zone: timeZone }
    )
      .toJSDate()
      .getTime();

    return new ZonedDateTime(epochMilliseconds, timeZone);
  }

  toString() {
    const { year, month, day } = this;
    const luxon = LuxonDateTime.fromObject({ year, month, day });

    return luxon.toISODate();
  }
}

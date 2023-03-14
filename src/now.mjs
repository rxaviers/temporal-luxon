import {
  PlainDate,
  PlainTime,
  PlainDateTime,
  Instant,
  ZonedDateTime,
} from "./index.mjs";
import { DateTime as LuxonDateTime } from "./luxon.mjs";

export class Now {
  static timeZone() {
    return LuxonDateTime.now().zoneName;
  }

  static plainDateISO() {
    return PlainDate.from(LuxonDateTime.now().toISODate());
  }

  static plainTimeISO() {
    return PlainTime.from(
      LuxonDateTime.now().toISOTime({ includeOffset: false })
    );
  }

  static plainDateTimeISO() {
    return PlainDateTime.from(
      LuxonDateTime.now().toISO({ includeOffset: false })
    );
  }

  static instant() {
    return Instant.from(Date.now());
  }

  static zonedDateTimeISO() {
    return new ZonedDateTime(Date.now(), Now.timeZone());
  }
}

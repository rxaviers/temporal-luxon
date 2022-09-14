import { DateTime as LuxonDateTime } from "luxon";
import { PlainDate, PlainDateTime, Instant, ZonedDateTime } from "./index.mjs";

export class Now {
  static instant() {
    return Instant.from(Date.now());
  }

  static timeZone() {
    return LuxonDateTime.now().zoneName;
  }

  static zonedDateTimeISO() {
    return new ZonedDateTime(Date.now(), Now.timeZone());
  }

  static plainDateISO() {
    return PlainDate.from(LuxonDateTime.now().toISODate());
  }

  static plainDateTimeISO() {
    return PlainDateTime.from(
      LuxonDateTime.now().toISO({ includeOffset: false })
    );
  }
}

export class TimeZone {
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
}

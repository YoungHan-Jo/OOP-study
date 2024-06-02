import { Duration } from '../value/duration';

export class Call {
  private from: Date;
  private to: Date;

  public constructor({ from, to }: { from: Date; to: Date }) {
    this.from = from;
    this.to = to;
  }

  public getDuration(): Duration {
    return Duration.between(this.from, this.to);
  }

  public isAfterNightlyDiscountHour(lateNightHour: number): boolean {
    return this.from.getHours() >= lateNightHour;
  }
}

import { Duration } from '../value/duration';
import { DateTimeInterval } from './ratePolicy';

export class Call {
  private interval: DateTimeInterval;

  public constructor({ from, to }: { from: Date; to: Date }) {
    this.interval = DateTimeInterval.of({ from, to });
  }

  public splitByDay(): DateTimeInterval[] {
    return this.interval.splitByDay();
  }

  public getDuration(): Duration {
    return this.interval.duration();
  }

  public getFrom(): Date {
    return this.interval.getFrom();
  }

  public getTo(): Date {
    return this.interval.getTo();
  }

  public getInterval(): DateTimeInterval {
    return this.interval;
  }
}

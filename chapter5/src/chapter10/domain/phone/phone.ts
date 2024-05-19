import { Money } from '../../value';
import { Call } from '../call';
import { RatePolicy } from '../ratePolicy/ratePolicy.interface';

export class Phone {
  private ratePolicy: RatePolicy;
  private calls: Call[];

  public constructor({ ratePolicy }: { ratePolicy: RatePolicy }) {
    this.ratePolicy = ratePolicy;
    this.calls = [];
  }

  public call(call: Call): void {
    this.calls.push(call);
  }

  public getCalls(): Call[] {
    return this.calls;
  }

  public calculateFee = (): Money => {
    return this.ratePolicy.calculateFee(this);
  };
}

import { Duration, Money } from '../../../value';
import { Call } from '../../call';
import { BasicRatePolicy } from './basicRatePolicy';

export class FixedFeePolicy extends BasicRatePolicy {
  private amount: Money;
  private seconds: Duration;

  public constructor({
    amount,
    seconds,
  }: {
    amount: Money;
    seconds: Duration;
  }) {
    super();
    this.amount = amount;
    this.seconds = seconds;
  }

  protected calculateCallFee = (call: Call): Money => {
    return this.amount.times(
      call.getDuration().getInSecondes() / this.seconds.getInSecondes(),
    );
  };
}

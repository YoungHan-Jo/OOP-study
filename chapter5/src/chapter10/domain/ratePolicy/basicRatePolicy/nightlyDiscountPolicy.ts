import { Duration, Money } from '../../../value';
import { Call } from '../../call';
import { BasicRatePolicy } from './basicRatePolicy';

export class NightlyDiscountPolicy extends BasicRatePolicy {
  private static readonly LATE_NIGHT_HOUR = 22;
  private nightlyAmount: Money;
  private regularAmount: Money;
  private seconds: Duration;

  public constructor({
    nightlyAmount,
    regularAmount,
    seconds,
  }: {
    nightlyAmount: Money;
    regularAmount: Money;
    seconds: Duration;
  }) {
    super();
    this.nightlyAmount = nightlyAmount;
    this.regularAmount = regularAmount;
    this.seconds = seconds;
  }

  protected calculateCallFee = (call: Call): Money => {
    if (
      call.isAfterNightlyDiscountHour(NightlyDiscountPolicy.LATE_NIGHT_HOUR)
    ) {
      return this.nightlyAmount.times(
        call.getDuration().getInSecondes() / this.seconds.getInSecondes(),
      );
    }

    return this.regularAmount.times(
      call.getDuration().getInSecondes() / this.seconds.getInSecondes(),
    );
  };
}

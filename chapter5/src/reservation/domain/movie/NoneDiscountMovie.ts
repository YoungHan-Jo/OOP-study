import { Movie } from './Movie';
import { Duration, Money } from '../../value';
import { DiscountCondition } from '../discountCondition/DiscountCondition.interface';

export class NoneDiscountMovie extends Movie {
  public constructor({
    title,
    runningTime,
    fee,
    discountConditionList,
  }: {
    title: string;
    runningTime: Duration;
    fee: Money;
    discountConditionList: DiscountCondition[];
  }) {
    super({
      title,
      runningTime,
      fee,
      discountConditionList,
    });
  }
  protected calculateDiscountAmount(): Money {
    return Money.Zero;
  }
}

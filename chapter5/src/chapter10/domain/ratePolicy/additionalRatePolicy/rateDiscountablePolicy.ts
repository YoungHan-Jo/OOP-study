import { Money } from '../../../value';
import { AdditionalRatePolicy } from './additionalRatePolicy';
import { RatePolicy } from '../ratePolicy.interface';

export class RateDiscountablePolicy extends AdditionalRatePolicy {
    private discountAmount: Money;

    public constructor({
        next,
        discountAmount,
    }: {
        next: RatePolicy;
        discountAmount: Money;
    }) {
        super({ next });
        this.discountAmount = discountAmount;
    }

    protected afterCalculated = (fee: Money): Money => {
        return fee.minus(this.discountAmount);
    };
}

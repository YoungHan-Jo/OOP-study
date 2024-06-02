import { Money } from '../../../value';
import { AdditionalRatePolicy } from './additionalRatePolicy';
import { RatePolicy } from '../ratePolicy.interface';

export class TaxablePolicy extends AdditionalRatePolicy {
    private taxRatio: number;

    public constructor({
        taxRatio,
        next,
    }: {
        taxRatio: number;
        next: RatePolicy;
    }) {
        super({ next });
        this.taxRatio = taxRatio;
    }
    protected afterCalculated = (fee: Money): Money => {
        return fee.plus(fee.times(this.taxRatio));
    };
}

import { Money } from '../../../value';
import { Phone } from '../../phone/phone';
import { RatePolicy } from '../ratePolicy.interface';

export abstract class AdditionalRatePolicy implements RatePolicy {
    private next: RatePolicy;

    public constructor({ next }: { next: RatePolicy }) {
        this.next = next;
    }
    public calculateFee = (phone: Phone): Money => {
        const fee = this.next.calculateFee(phone);
        return this.afterCalculated(fee);
    };

    protected abstract afterCalculated(fee: Money): Money;
}

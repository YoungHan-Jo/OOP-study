import { Money } from '../../../value';
import { Phone } from '../../phone/phone';
import { RatePolicy } from '../ratePolicy.interface';
import { Call } from '../../call';

export abstract class BasicRatePolicy implements RatePolicy {
    public calculateFee = (phone: Phone): Money => {
        let result: Money = Money.ZERO;

        for (const call of phone.getCalls()) {
            result = result.plus(this.calculateCallFee(call));
        }

        return result;
    };
    protected abstract calculateCallFee(call: Call): Money;
}

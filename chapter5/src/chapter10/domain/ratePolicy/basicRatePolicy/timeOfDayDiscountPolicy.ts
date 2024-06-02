import { Duration, Money } from "src/chapter10/value";
import { Call } from "../../call";
import { BasicRatePolicy } from "./basicRatePolicy";
import { DateTimeInterval } from "./dateTimeInterval";

export class TimeOfDayDiscountPolicy extends BasicRatePolicy {
    private starts: Date[];
    private ends: Date[];
    private durations: Duration[];
    private amounts: Money[];



    protected calculateCallFee(call: Call): Money {
        let result = Money.ZERO;



        return result;
    }

}
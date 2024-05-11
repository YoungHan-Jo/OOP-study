import { Duration } from "src/reservation/value/Duration";
import { Movie } from "./Movie";
import { Money } from "src/reservation/value/Money";
import { DiscountCondition } from "../discountCondition/DiscountCondition.interface";

export class NoneDiscountMovie extends Movie {
    public constructor({
        title,
        runningTime,
        fee,
        discountConditionList,
    }: {
        title: string,
        runningTime: Duration,
        fee: Money,
        discountConditionList: DiscountCondition[],
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
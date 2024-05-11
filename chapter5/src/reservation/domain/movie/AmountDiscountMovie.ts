import { Money } from "src/reservation/value/Money";
import { Movie } from "./Movie";
import { Duration } from "src/reservation/value/Duration";
import { DiscountCondition } from "../discountCondition/DiscountCondition.interface";

export class AmountDiscountMovie extends Movie {
    private discountAmount: Money;

    public constructor({
        title,
        runningTime,
        fee,
        discountConditionList,
        discountAmount,
    }: {
        title: string,
        runningTime: Duration,
        fee: Money,
        discountConditionList: DiscountCondition[],
        discountAmount: Money;
    }) {
        super({
            title,
            runningTime,
            fee,
            discountConditionList,
        });
        this.discountAmount = discountAmount;
    }

    protected calculateDiscountAmount(): Money {
        return this.discountAmount;
    }

}
import { Duration } from "src/reservation/value/Duration";
import { Movie } from "./Movie";
import { Money } from "src/reservation/value/Money";
import { DiscountCondition } from "../discountCondition/DiscountCondition.interface";

export class PercentDiscountMovie extends Movie {
    private discountPercent: number;

    public constructor({
        title,
        runningTime,
        fee,
        discountConditionList,
        discountPercent,
    }: {
        title: string,
        runningTime: Duration,
        fee: Money,
        discountConditionList: DiscountCondition[],
        discountPercent: number;
    }) {
        super({
            title,
            runningTime,
            fee,
            discountConditionList,
        });
        this.discountPercent = discountPercent;
    }

    protected calculateDiscountAmount(): Money {
        return this.getFee().times(this.discountPercent);
    }
}
import { Duration, Money } from "../../value";
import { DiscountCondition } from "../discountCondition/DiscountCondition.interface";
import { Screening } from "../Screening";

export abstract class Movie {
    private title: string;
    private runningTime: Duration;
    private fee: Money;
    private discountConditionList: DiscountCondition[];

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
        this.title = title;
        this.runningTime = runningTime;
        this.fee = fee;
        this.discountConditionList = discountConditionList;
    }

    public calculateMovieFee = (screening: Screening): Money => {
        if (this.isDiscountable(screening)) {
            return this.fee.minus(this.calculateDiscountAmount())
        }
        return this.fee;
    }

    private isDiscountable = (screening: Screening): boolean => {
        return this.discountConditionList.some(discountCondition => discountCondition.isSatisfiedBy(screening));
    }

    protected getFee = (): Money => {
        return this.fee;
    }

    protected abstract calculateDiscountAmount(): Money;

}
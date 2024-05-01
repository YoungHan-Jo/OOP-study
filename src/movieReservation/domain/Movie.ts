import { Duration } from "../valueObject/Duration";
import { Money } from "../valueObject/Money";
import { Screening } from "./Screening";
import { DiscountPolicy } from "./discount/DiscountPolicy";

export class Movie {
    private title: string;
    private runningTime: Duration;
    private fee: Money;
    private discountPolicy: DiscountPolicy;

    public constructor(title: string, runningTime: Duration, fee: Money, discountPolicy: DiscountPolicy) {
        this.title = title;
        this.runningTime = runningTime;
        this.fee = fee;
        this.discountPolicy = discountPolicy;
    }

    public getFee = (): Money => {
        return this.fee;
    }

    public calculateMovieFee = (screening: Screening): Money => {
        return this.fee.minus(this.discountPolicy.calculateDiscountAmount(screening));
    }
}
import { Money } from "src/movieReservation/valueObject/Money";
import { Screening } from "../Screening";
import { DiscountPolicy } from "./DiscountPolicy";
import { DiscountCondition } from "./discountCondition/DiscountCondition.interface";

export class PercentDiscountPolicy extends DiscountPolicy {
    private percent: number;

    public constructor(percent: number, ...conditions: DiscountCondition[]) {
        super(...conditions);
        this.percent = percent;
    }

    protected getDiscountAmount(screening: Screening): Money {
        return screening.getMovieFee().times(this.percent)
    }

}
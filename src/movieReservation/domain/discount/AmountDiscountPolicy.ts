import { Money } from "src/movieReservation/valueObject/Money";
import { Screening } from "../Screening";
import { DiscountPolicy } from "./DiscountPolicy";
import { DiscountCondition } from "./discountCondition/DiscountCondition.interface";

export class AmountDiscountPolicy extends DiscountPolicy {
    private discountAmount: Money;

    public constructor(discountAmount: Money, ...conditions: DiscountCondition[]) {
        super(...conditions);
        this.discountAmount = discountAmount;
    }

    protected getDiscountAmount(screening: Screening): Money {
        return this.discountAmount;
    }

}
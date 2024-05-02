import { Money } from "../../../movieReservation/valueObject/Money";
import { Screening } from "../Screening";
import { DiscountPolicy } from "./DiscountPolicy";

export class NoneDiscountPolicy extends DiscountPolicy {

    public constructor() {
        super({ conditions: [] });
    }

    protected getDiscountAmount = (screening: Screening): Money => {
        return Money.ZERO;
    }
}
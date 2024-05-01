import { Money } from "src/movieReservation/valueObject/Money";
import { Screening } from "../Screening";
import { DiscountCondition } from "./DiscountCondition";

export abstract class DiscountPolicy {
    private conditions: DiscountCondition[] = [];

    public constructor(...conditions: DiscountCondition[]) {
        this.conditions = conditions;
    }

    public calculateDiscountAmount = (screening: Screening): Money => {
        for (const condition of this.conditions) {
            if (condition.isSatisfiedBy(screening)) {
                return this.getDiscountAmount(screening);
            }
        }

        return Money.ZERO
    }

    protected abstract getDiscountAmount(screening: Screening): Money;


}
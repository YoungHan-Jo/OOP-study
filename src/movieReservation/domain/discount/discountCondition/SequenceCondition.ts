import { Screening } from "../../Screening";
import { DiscountCondition } from "./DiscountCondition.interface";

export class SequenceCondition implements DiscountCondition {
    private sequence: number;

    public constructor(sequence: number) {
        this.sequence = sequence;
    }

    public isSatisfiedBy = (screening: Screening): boolean => {
        return screening.isSequence(this.sequence);
    }
}
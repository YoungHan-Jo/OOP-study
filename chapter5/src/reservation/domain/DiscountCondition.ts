import { DayOFWeek } from "../constant/DayOfWeek";
import { DiscountConditionType } from "../constant/DiscountConditionType";
import { Screening } from "./Screening";

export class DiscountCondition {

    private type: DiscountConditionType;
    private sequence: number;
    private dayOfWeek: DayOFWeek;
    private startTime: Date;
    private endTime: Date;

    public constructor({
        type,
        sequence,
        dayOfWeek,
        startTime,
        endTime,
    }: {
        type: DiscountConditionType,
        sequence?: number,
        dayOfWeek?: DayOFWeek,
        startTime?: Date,
        endTime?: Date,
    }) {
        this.type = type;
        this.sequence = sequence;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public isSatisfiedBy = (screening: Screening): boolean => {
        if (this.type == DiscountConditionType.Period) {
            return this.isSatisfiedByPeriod(screening);
        }
        return this.isSatisfiedBySequence(screening);
    }

    private isSatisfiedByPeriod = (screening: Screening): boolean => {
        return screening.getWhenScreened().getDay() == this.dayOfWeek &&
            this.startTime.getTime() <= screening.getWhenScreened().getTime() &&
            this.endTime.getTime() >= screening.getWhenScreened().getTime();
    }

    private isSatisfiedBySequence = (screening: Screening): boolean => {
        return this.sequence == screening.getSequence();
    }


}
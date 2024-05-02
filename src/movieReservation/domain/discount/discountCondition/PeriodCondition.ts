import { Screening } from "../../Screening";
import { DiscountCondition } from "./DiscountCondition.interface";

export class PeriodCondition implements DiscountCondition {
    private dayOfWeek: Date;
    private startTime: Date;
    private endTime: Date;

    public constructor(dayOfWeek: Date, startTime: Date, endTime: Date) {
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    isSatisfiedBy(screening: Screening): boolean {
        const startTime = screening.getStartTime()
        return startTime.getDay() === this.dayOfWeek.getDay() &&
            startTime.getTime() >= this.startTime.getTime() &&
            startTime.getTime() <= this.endTime.getTime()
    }

}
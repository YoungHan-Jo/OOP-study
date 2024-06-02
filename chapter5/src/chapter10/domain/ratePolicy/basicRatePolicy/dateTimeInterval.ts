import { Duration } from "src/chapter10/value";

export class DateTimeInterval {

    private from: Date;
    private to: Date;

    private constructor(from: Date, to: Date) {
        this.from = from;
        this.to = to;
    }

    public static of = ({ from, to }: { from: Date, to: Date }): DateTimeInterval => {
        return new DateTimeInterval(from, to);
    }

    public static toMidnight = (from: Date): DateTimeInterval => {
        return new DateTimeInterval(from, new Date(from.getFullYear(), from.getMonth(), from.getDate(), 23, 59, 59));
    }

    public static fromMidnight = (to: Date): DateTimeInterval => {
        return new DateTimeInterval(new Date(to.getFullYear(), to.getMonth(), to.getDate()), to);
    }

    public static during = (date: Date): DateTimeInterval => {
        return new DateTimeInterval(
            new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
        );
    }

    public duration = (): Duration => {
        return Duration.between(this.from, this.to);
    }

    public getFrom = (): Date => {
        return this.from;
    }

    public getTo = (): Date => {
        return this.to;
    }

    splitByDay(): DateTimeInterval[] {
        throw new Error('Method not implemented.');
    }

}
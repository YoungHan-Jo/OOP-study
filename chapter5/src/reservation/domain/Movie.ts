import { MovieType } from "../constant/MovieType";
import { Duration } from "../value/Duration";
import { Money } from "../value/Money";
import { DiscountCondition } from "./discountCondition/DiscountCondition.interface";
import { Screening } from "./Screening";

export class Movie {
    private title: string;
    private runningTime: Duration;
    private fee: Money;
    private discountConditionList: DiscountCondition[];

    private movieType: MovieType;
    private discountAmount: Money;
    private discountPercent: number;

    public constructor({
        title,
        runningTime,
        fee,
        discountConditionList,
        movieType,
        discountAmount,
        discountPercent,
    }: {
        title: string,
        runningTime: Duration,
        fee: Money,
        discountConditionList: DiscountCondition[],
        movieType: MovieType,
        discountAmount?: Money,
        discountPercent?: number,
    }) {
        this.title = title;
        this.runningTime = runningTime;
        this.fee = fee;
        this.discountConditionList = discountConditionList;
        this.movieType = movieType;
        this.discountAmount = discountAmount;
        this.discountPercent = discountPercent;
    }

    public calculateMovieFee = (screening: Screening): Money => {
        if (this.isDiscountable(screening)) {
            return this.fee.minus(this.calculateDiscountAmount())
        }
        return this.fee;
    }

    private isDiscountable = (screening: Screening): boolean => {
        for (const discountCondition of this.discountConditionList) {
            if (discountCondition.isSatisfiedBy(screening)) {
                return true;
            }
        }
        return false;
    }

    private calculateDiscountAmount = (): Money => {
        switch (this.movieType) {
            case MovieType.AmountDiscount:
                return this.discountAmount;
            case MovieType.PercentDiscount:
                return this.discountAmount.times(this.discountPercent);
            case MovieType.NoneDiscount:
                return Money.Zero;
        }
    }

}
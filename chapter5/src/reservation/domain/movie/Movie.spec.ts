import { DayOFWeek } from "../../constant/DayOfWeek";
import { MovieType } from "../../constant/MovieType";
import { Duration } from "../../value/Duration";
import { Money } from "../../value/Money";
import { Screening } from "../Screening";
import { PeroidCondition } from "../discountCondition/PeriodCondition";
import { SequenceCondition } from "../discountCondition/SequenceCondition";
import { AmountDiscountMovie } from "./AmountDiscountMovie";
import { Movie } from "./Movie";

describe('Domain: Movie', () => {

    let screening: Screening;

    it('calculateMovieFee: Sequence', () => {
        // Given
        screening = new Screening({
            sequence: 3,
            whenScreened: new Date('2024-05-11T10:00:00')
        })
        const movie = new AmountDiscountMovie({
            title: 'Avatar',
            runningTime: new Duration(130),
            fee: new Money(2000),
            discountConditionList: [
                new SequenceCondition({
                    sequence: 3
                }),
                new PeroidCondition({
                    dayOfWeek: 3,
                    startTime: new Date('2024-05-11T9:00:00'),
                    endTime: new Date('2024-05-11T11:00:00')
                })
            ],
            discountAmount: new Money(200),
        })
        // When
        const movieFee = movie.calculateMovieFee(screening);

        // Then
        expect(movieFee.isEqual(new Money(1800))).toBe(true);
    })

    it('calculateMovieFee: Period, not satisfied', () => {
        // Given
        screening = new Screening({
            sequence: 3,
            whenScreened: new Date('2024-05-11T10:00:00')
        })
        const movie = new AmountDiscountMovie({
            title: 'Avatar',
            runningTime: new Duration(130),
            fee: new Money(2000),
            discountConditionList: [
                new SequenceCondition({
                    sequence: 1
                }),
                new PeroidCondition({
                    dayOfWeek: DayOFWeek.Wednesday,
                    startTime: new Date('2024-05-11T09:00:00'),
                    endTime: new Date('2024-05-11T11:00:00')
                })
            ],
            discountAmount: new Money(200),
        })
        // When
        const movieFee = movie.calculateMovieFee(screening);

        // Then
        expect(movieFee.isEqual(new Money(1800))).toBe(false);
    })

    it('calculateMovieFee: Period, satisfied', () => {
        // Given
        screening = new Screening({
            sequence: 3,
            whenScreened: new Date('2024-05-11T10:00:00')
        })
        const movie = new AmountDiscountMovie({
            title: 'Avatar',
            runningTime: new Duration(130),
            fee: new Money(2000),
            discountConditionList: [
                new SequenceCondition({
                    sequence: 1
                }),
                new PeroidCondition({
                    dayOfWeek: DayOFWeek.Saturday,
                    startTime: new Date('2024-05-11T09:00:00'),
                    endTime: new Date('2024-05-11T11:00:00')
                })
            ],
            discountAmount: new Money(200),
        })
        // When
        const movieFee = movie.calculateMovieFee(screening);

        // Then
        expect(movieFee.isEqual(new Money(1800))).toBe(true);
    })
})
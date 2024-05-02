import { DayOFWeek } from '../constant/DayOfWeek';
import { Duration } from '../valueObject/Duration';
import { Money } from '../valueObject/Money';
import { Customer } from './Customer';
import { Screening } from './Screening';
import { AmountDiscountPolicy } from './discount/AmountDiscountPolicy';
import { NoneDiscountPolicy } from './discount/NoneDiscountPolicy';
import { PercentDiscountPolicy } from './discount/PercentDiscountPolicy';
import { PeriodCondition } from './discount/discountCondition/PeriodCondition';
import { SequenceCondition } from './discount/discountCondition/SequenceCondition';
import { Movie } from './movie';

describe('Domain: movieReservation', () => {
    const MOVIE_FEE = 1500;
    const AUDIENCE_COUNT = 2;
    const WHEN_SCREENED = new Date('2021-07-01');

    let customer: Customer;
    let movieByAmountDiscountPolicy: Movie;
    let movieByNoneDiscountPolicy: Movie;

    beforeEach(() => {
        const discountAmount = 100;
        const screeningSequence = 1;

        customer = new Customer();

        movieByAmountDiscountPolicy = new Movie({
            title: 'Avatar',
            runningTime: new Duration({ ofMinutes: 120 }),
            fee: new Money({ amount: MOVIE_FEE }),
            discountPolicy: new AmountDiscountPolicy({
                discountAmount: new Money({ amount: discountAmount }),
                conditions: [
                    new SequenceCondition({ sequence: screeningSequence }),
                    new SequenceCondition({ sequence: 10 }),
                    new PeriodCondition({
                        dayOfWeek: DayOFWeek.WEDNESDAY,
                        startTime: new Date('2021-07-01T10:00:00'),
                        endTime: new Date('2021-07-01T11:00:00'),
                    }),
                ],
            }),
        });
    });

    it('reserve movie by amount discount policy', () => {
        // Given
        const discountAmount = 100;
        const screeningSequence = 1;

        const screening = new Screening({
            movie: movieByAmountDiscountPolicy,
            sequence: screeningSequence,
            whenScreened: WHEN_SCREENED,
        });

        // When
        const reservation = screening.reserve(customer, AUDIENCE_COUNT);

        // Then
        expect(reservation.getFee().getAmount()).toBe(
            new Money({
                amount: (MOVIE_FEE - discountAmount) * AUDIENCE_COUNT,
            }).getAmount(),
        );
    });

    it('reserve movie by amount discount policy, but incorrect condition', () => {
        // Given
        const discountAmount = 100;
        const incorrectScreeningSequence = 2;

        const screening = new Screening({
            movie: movieByAmountDiscountPolicy,
            sequence: incorrectScreeningSequence,
            whenScreened: WHEN_SCREENED,
        });

        // When
        const reservation = screening.reserve(customer, AUDIENCE_COUNT);

        // Then
        expect(reservation.getFee().getAmount()).toBe(
            new Money({
                amount: MOVIE_FEE * AUDIENCE_COUNT,
            }).getAmount(),
        );
        expect(reservation.getFee().getAmount()).not.toBe(
            new Money({
                amount: (MOVIE_FEE - discountAmount) * AUDIENCE_COUNT,
            }).getAmount(),
        );
    });

    it('reserve movie by none discount policy', () => {
        // Given
        movieByNoneDiscountPolicy = new Movie({
            title: 'Avatar',
            runningTime: new Duration({ ofMinutes: 120 }),
            fee: new Money({ amount: MOVIE_FEE }),
            discountPolicy: new NoneDiscountPolicy(),
        });

        const screening = new Screening({
            movie: movieByNoneDiscountPolicy,
            sequence: 11,
            whenScreened: WHEN_SCREENED,
        });

        // When
        const reservation = screening.reserve(customer, AUDIENCE_COUNT);

        // Then
        expect(reservation.getFee().getAmount()).toBe(
            new Money({ amount: MOVIE_FEE * AUDIENCE_COUNT }).getAmount(),
        );
    });

    it('change discount policy', () => {
        // Given
        movieByAmountDiscountPolicy.changeDiscountPolicy(
            new PercentDiscountPolicy({
                percent: 0.1,
                conditions: [
                    new SequenceCondition({ sequence: 1 }),
                    new SequenceCondition({ sequence: 10 }),
                    new PeriodCondition({
                        dayOfWeek: DayOFWeek.WEDNESDAY,
                        startTime: new Date('2021-07-01T10:00:00'),
                        endTime: new Date('2021-07-01T11:00:00'),
                    }),
                ],
            })
        )

        const screening = new Screening({
            movie: movieByAmountDiscountPolicy,
            sequence: 1,
            whenScreened: WHEN_SCREENED,
        })

        // When
        const reservation = screening.reserve(customer, AUDIENCE_COUNT)

        // Then
        expect(reservation.getFee().getAmount()).toBe(
            new Money({
                amount: MOVIE_FEE * 0.9 * AUDIENCE_COUNT,
            }).getAmount()
        )

    })
});

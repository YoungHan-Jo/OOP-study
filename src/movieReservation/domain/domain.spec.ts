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
    const TOMORROW = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

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
            whenScreened: TOMORROW,
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
            whenScreened: TOMORROW,
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
            whenScreened: TOMORROW,
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
            whenScreened: TOMORROW,
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

    it('if audience count is negative, it would be error', () => {
        // Given
        const discountAmount = 100;
        const screeningSequence = 1;

        const screening = new Screening({
            movie: movieByAmountDiscountPolicy,
            sequence: screeningSequence,
            whenScreened: TOMORROW,
        });

        // Then
        expect(() => {
            screening.reserve(customer, 0)
        }).toThrow('customer is null or audienceCount is less than 1')
    });

    it('if customer is null, it would be error', () => {
        // Given
        const discountAmount = 100;
        const screeningSequence = 1;

        const screening = new Screening({
            movie: movieByAmountDiscountPolicy,
            sequence: screeningSequence,
            whenScreened: TOMORROW,
        });

        // Then
        expect(() => {
            screening.reserve(null, 1)
        }).toThrow('customer is null or audienceCount is less than 1')
    });

    it('when creating screen, movie should not be null', () => {
        // Given
        const discountAmount = 100;
        const screeningSequence = 1;

        // Then
        expect(() => {
            new Screening({
                movie: null,
                sequence: screeningSequence,
                whenScreened: TOMORROW,
            });
        }).toThrow('movie should not be null')
    });

    it('when creating screen, sequence should be greater than 0', () => {

        // Then
        expect(() => {
            new Screening({
                movie: movieByAmountDiscountPolicy,
                sequence: 0,
                whenScreened: TOMORROW,
            });
        }).toThrow('sequence should be greater than 0')
    });

    it('when creating screen, whenScreend should be greater than now', () => {

        // Then
        expect(() => {
            new Screening({
                movie: movieByAmountDiscountPolicy,
                sequence: 1,
                whenScreened: new Date(new Date().getTime() - 1000),
            });
        }).toThrow('whenScreened should be greater than current date')
    });
});

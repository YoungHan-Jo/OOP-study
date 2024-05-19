import { Duration, Money } from '../value';
import { Call } from './call';
import { Phone } from './phone/phone';
import { TaxablePolicy } from './ratePolicy';
import { NightlyDiscountPolicy } from './ratePolicy/basicRatePolicy/nightlyDiscountPolicy';
import { RegularPolicy } from './ratePolicy/basicRatePolicy/regularPolicy';

describe('Domain', () => {
    it('calculateFee', () => {
        //Given
        const regularPhone = new Phone({
            ratePolicy: new RegularPolicy({
                amount: new Money(1),
                seconds: new Duration(10),
            }),
        });

        //When
        regularPhone.call(
            new Call({
                from: new Date('2024-05-11T10:00:00'),
                to: new Date('2024-05-11T10:01:00'),
            }),
        );
        regularPhone.call(
            new Call({
                from: new Date('2024-05-11T10:01:00'),
                to: new Date('2024-05-11T10:02:00'),
            }),
        );

        //Then
        expect(regularPhone.calculateFee().isEqual(new Money((120 / 10) * 1))).toBe(
            true,
        );
    });

    it('nightly discount calculateFee', () => {
        // Given
        const nightlyDiscountPhone = new Phone({
            ratePolicy: new NightlyDiscountPolicy({
                nightlyAmount: new Money(1),
                regularAmount: new Money(2),
                seconds: new Duration(10),
            }),
        });

        // When
        nightlyDiscountPhone.call(
            new Call({
                from: new Date('2024-05-11T10:00:00'),
                to: new Date('2024-05-11T10:01:00'),
            }),
        );
        nightlyDiscountPhone.call(
            new Call({
                from: new Date('2024-05-11T22:00:00'),
                to: new Date('2024-05-11T22:01:00'),
            }),
        );

        // Then
        expect(
            nightlyDiscountPhone
                .calculateFee()
                .isEqual(new Money((60 / 10) * 2 + (60 / 10) * 1)),
        ).toBe(true);
    });

    it('calculateFee basic + additional rate policy', () => {
        const feePer = 2;
        const taxRatio = 0.1;
        //Given
        const phone = new Phone({
            ratePolicy: new TaxablePolicy({
                next: new RegularPolicy({
                    amount: new Money(feePer),
                    seconds: new Duration(10),
                }),
                taxRatio
            })



        });

        //When
        phone.call(
            new Call({
                from: new Date('2024-05-11T10:00:00'),
                to: new Date('2024-05-11T10:01:00'),
            }),
        );
        phone.call(
            new Call({
                from: new Date('2024-05-11T10:01:00'),
                to: new Date('2024-05-11T10:02:00'),
            }),
        );

        const feeBeforeTax = new Money((120 / 10) * feePer);
        //Then
        expect(
            phone.calculateFee().isEqual(feeBeforeTax.plus(feeBeforeTax.times(taxRatio)))
        ).toBe(true);
    });

});

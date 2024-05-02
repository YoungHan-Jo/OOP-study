import { Money } from '../../valueObject/Money';
import { Screening } from '../Screening';
import { DiscountCondition } from './discountCondition/DiscountCondition.interface';

export abstract class DiscountPolicy {
    private conditions: DiscountCondition[] = [];

    public constructor({ conditions }: { conditions: DiscountCondition[] }) {
        this.conditions = conditions;
    }

    public calculateDiscountAmount = (screening: Screening): Money => {
        for (const condition of this.conditions) {
            if (condition.isSatisfiedBy(screening)) {
                return this.getDiscountAmount(screening);
            }
        }

        return Money.ZERO;
    };

    // Template Method Pattern
    // 親クラスで処理の骨組みを定義し、子クラスで具体的な処理を定義する
    protected abstract getDiscountAmount(screening: Screening): Money;
}

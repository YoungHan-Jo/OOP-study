import { Screening } from '../Screening';
import { DiscountCondition } from './DiscountCondition.interface';

export class SequenceCondition implements DiscountCondition {
  private sequence: number;

  public constructor({ sequence }: { sequence: number }) {
    this.sequence = sequence;
  }

  public isSatisfiedBy = (screening: Screening): boolean => {
    return this.sequence == screening.getSequence();
  };
}

import { DayOFWeek } from 'src/reservation/constant/DayOfWeek';
import { Screening } from '../Screening';
import { DiscountCondition } from './DiscountCondition.interface';

export class PeroidCondition implements DiscountCondition {
  private dayOfWeek: DayOFWeek;
  private startTime: Date;
  private endTime: Date;

  constructor({
    dayOfWeek,
    startTime,
    endTime,
  }: {
    dayOfWeek: DayOFWeek;
    startTime: Date;
    endTime: Date;
  }) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  public isSatisfiedBy = (screening: Screening): boolean => {
    return (
      screening.getWhenScreened().getDay() == this.dayOfWeek &&
      this.startTime.getTime() <= screening.getWhenScreened().getTime() &&
      this.endTime.getTime() >= screening.getWhenScreened().getTime()
    );
  };
}

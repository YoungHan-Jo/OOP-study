import { Money } from '../valueObject/Money';
import { Screening } from './Screening';
import { Customer } from './Customer';

export class Reservation {
  private customer: Customer;
  private screening: Screening;
  private fee: Money;
  private audienceCount: number;

  public constructor({
    customer,
    screening,
    fee,
    audienceCount,
  }: {
    customer: Customer;
    screening: Screening;
    fee: Money;
    audienceCount: number;
  }) {
    this.customer = customer;
    this.screening = screening;
    this.fee = fee;
    this.audienceCount = audienceCount;
  }

  public getFee = (): Money => {
    return this.fee;
  };
}

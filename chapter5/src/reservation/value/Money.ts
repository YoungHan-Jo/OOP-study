export class Money {
  private amount: number;

  public static Zero = new Money(0);

  public constructor(amount: number) {
    this.amount = amount;
  }

  public plus = (other: Money): Money => {
    return new Money(this.amount + other.amount);
  };

  public minus = (other: Money): Money => {
    return new Money(this.amount - other.amount);
  };

  public times = (percent: number): Money => {
    return new Money(this.amount * percent);
  };

  public isLessThan = (other: Money): boolean => {
    return this.amount < other.amount;
  };

  public isGreaterThanOrEqual = (other: Money): boolean => {
    return this.amount >= other.amount;
  };

  public isEqual = (other: Money): boolean => {
    return this.amount === other.amount;
  };
}

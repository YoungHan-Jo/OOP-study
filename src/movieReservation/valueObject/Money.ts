export class Money {
  public static yens = (amount: number): Money => {
    return new Money({ amount });
  };

  public static readonly ZERO: Money = Money.yens(0);
  private readonly amount: number;

  public constructor({ amount }: { amount: number }) {
    this.amount = amount;
  }

  public getAmount = (): number => {
    return this.amount;
  };

  public plus = (amount: Money): Money => {
    return new Money({ amount: this.amount + amount.amount });
  };

  public minus = (amount: Money): Money => {
    return new Money({ amount: this.amount - amount.amount });
  };

  public times = (percent: number): Money => {
    return new Money({ amount: this.amount * percent });
  };

  public isLessThan = (other: Money): boolean => {
    return this.amount < other.amount;
  };

  public isGreaterThanOrEqual = (other: Money): boolean => {
    return this.amount >= other.amount;
  };
}

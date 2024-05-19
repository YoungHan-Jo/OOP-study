export class Money {
  public static ZERO = new Money(0);
  private amount: number;

  public constructor(amount: number) {
    this.amount = amount;
  }

  public getAmount(): number {
    return this.amount;
  }

  public plus(amount: Money): Money {
    return new Money(this.amount + amount.getAmount());
  }

  public minus(amount: Money): Money {
    return new Money(this.amount - amount.getAmount());
  }

  public times(percent: number): Money {
    return new Money(this.amount * percent);
  }

  public divide(percent: number): Money {
    return new Money(this.amount / percent);
  }

  public isEqual(amount: Money): boolean {
    return this.amount === amount.getAmount();
  }
}

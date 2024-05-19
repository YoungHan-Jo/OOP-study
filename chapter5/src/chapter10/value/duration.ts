export class Duration {
  private inSecondes: number;

  public constructor(inSecondes: number) {
    this.inSecondes = inSecondes;
  }

  public getInSecondes(): number {
    return this.inSecondes;
  }

  static between(from: Date, to: Date): Duration {
    return new Duration((to.getTime() - from.getTime()) / 1000);
  }
}

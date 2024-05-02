export class Duration {
  private ofMinutes: number;

  public constructor({ ofMinutes }: { ofMinutes: number }) {
    this.ofMinutes = ofMinutes;
  }

  public isShorterThan = (other: Duration): boolean => {
    return this.ofMinutes < other.ofMinutes;
  };
}

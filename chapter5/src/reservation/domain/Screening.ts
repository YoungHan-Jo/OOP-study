import { Money } from '../value/Money';
import { Movie } from './movie/Movie';
import { Reservation } from './Reservation';

export class Screening {
  private movie: Movie;
  private sequence: number;
  private whenScreened: Date;

  public constructor({
    sequence,
    whenScreened,
  }: {
    sequence: number;
    whenScreened: Date;
  }) {
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }

  public reserve = (): Reservation => {
    return new Reservation();
  };

  private calculateFee = (audienceCount: number): Money => {
    return this.movie.calculateMovieFee(this).times(audienceCount);
  };

  public getWhenScreened = (): Date => {
    return this.whenScreened;
  };

  public getSequence = (): number => {
    return this.sequence;
  };
}

import { Money } from '../valueObject/Money';
import { Customer } from './customer';
import { Reservation } from './reservation';
import { Movie } from './movie';

export class Screening {
  private movie: Movie;
  private sequence: number;
  private whenScreened: Date;

  public constructor({
    movie,
    sequence,
    whenScreened,
  }: {
    movie: Movie;
    sequence: number;
    whenScreened: Date;
  }) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }

  public getStartTime = (): Date => {
    return this.whenScreened;
  };

  public isSequence = (sequence: number): boolean => {
    return this.sequence === sequence;
  };

  public getMovieFee = (): Money => {
    return this.movie.getFee();
  };

  private calculateFee = (audienceCount: number): Money => {
    return this.movie.calculateMovieFee(this).times(audienceCount);
  };

  public reserve = (customer: Customer, audienceCount: number): Reservation => {
    return new Reservation({
      customer,
      screening: this,
      fee: this.calculateFee(audienceCount),
      audienceCount,
    });
  };
}

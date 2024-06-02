import { Money } from '../valueObject/Money';
import { Customer } from './customer';
import { Reservation } from './reservation';
import { Movie } from './movie';

export class Screening {
  private movie: Movie;
  private sequence: number;
  private whenScreened: Date;

  private invariants() {
    if (this.movie === null) {
      throw new Error('movie should not be null');
    }

    if (this.sequence <= 0) {
      throw new Error('sequence should be greater than 0');
    }

    if (this.whenScreened < new Date()) {
      throw new Error('whenScreened should be greater than current date');
    }
  }

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

    this.invariants();
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
    // precondition
    if (customer === null || audienceCount <= 0) {
      throw new Error('customer is null or audienceCount is less than 1');
    }

    return new Reservation({
      customer,
      screening: this,
      fee: this.calculateFee(audienceCount),
      audienceCount,
    });
  };
}

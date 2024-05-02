import { Customer } from "./Customer";
import { Screening } from "./Screening";
import { Movie } from "./movie";

describe('Domain: movieReservation', () => {

    const MOVIE_FEE = 1000;
    const AUDIENCE_COUNT = 2;
    const WHEN_SCREENED = new Date('2021-07-01');

    let customer: Customer;
    let movie: Movie;

    beforeEach(() => {
        customer = new Customer();
        // movie = new Movie(new Money(MOVIE_FEE));
    });

    it('reserve movie', () => {
        // Given
        const screening = new Screening(movie, AUDIENCE_COUNT, WHEN_SCREENED)

        // When
        const reservation = screening.reserve(customer, AUDIENCE_COUNT)


        // Then


    })
})
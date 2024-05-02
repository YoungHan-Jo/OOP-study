import { Audience } from './audience';
import { Bag } from './bag';
import { Invitation } from './invitation';
import { Theater } from './theater';
import { Ticket } from './ticket';
import { TicketOffice } from './ticketOffice';
import { TicketSeller } from './ticketSeller';

describe('Domain', () => {
  const TICKET_FEE = 1000;
  const BAG_AMOUNT = 5000;
  const OFFICE_AMOUNT = 0;
  const OFFICE_TICKET_COUNT = 10;

  let ticket: Ticket[];
  let ticketOffice: TicketOffice;
  let ticketSeller: TicketSeller;
  let theater: Theater;
  let inviation: Invitation;

  beforeEach(() => {
    ticket = Array.from({ length: OFFICE_TICKET_COUNT }).map(
      (i) => new Ticket(TICKET_FEE),
    );
    ticketOffice = new TicketOffice(OFFICE_AMOUNT, ticket);
    ticketSeller = new TicketSeller(ticketOffice);
    theater = new Theater(ticketSeller);
    inviation = new Invitation(new Date('2021-07-01'));
  });

  it('sell ticket to audience who has no invitation', () => {
    // Given
    const bag = new Bag(BAG_AMOUNT);
    const audience = new Audience(bag);

    // When
    theater.enter(audience);

    // Then
    expect(bag.getAmount()).toBe(BAG_AMOUNT - TICKET_FEE * 1);
    expect(bag.hasTicket()).toBe(true);
    expect(ticketOffice.getAmount()).toBe(OFFICE_AMOUNT + TICKET_FEE * 1);
  });

  it('sell ticket to audience who has invitation', () => {
    // Given
    const bag = new Bag(BAG_AMOUNT, inviation);
    const audience = new Audience(bag);

    // When
    theater.enter(audience);

    // Then
    expect(bag.getAmount()).toBe(BAG_AMOUNT - TICKET_FEE * 0);
    expect(bag.hasTicket()).toBe(true);
    expect(ticketOffice.getAmount()).toBe(OFFICE_AMOUNT + TICKET_FEE * 0);
  });
});

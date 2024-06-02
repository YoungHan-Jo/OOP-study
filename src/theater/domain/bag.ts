import { Invitation } from './invitation';
import { Ticket } from './ticket';

export class Bag {
  private amount: number;
  private invitation?: Invitation;
  private ticket?: Ticket;

  public constructor(amount: number, invitation?: Invitation) {
    this.amount = amount;
    this.invitation = invitation;
  }

  public getAmount = (): number => {
    return this.amount;
  };

  public hasTicket = (): boolean => {
    return this.ticket !== undefined;
  };

  public hold = (ticket: Ticket): number => {
    let result: number;
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      result = 0;

      // postcondition
      if (result < 0) {
        throw new Error('ticket fee should be greater than or equal to 0');
      }

      return result;
    }

    this.setTicket(ticket);
    this.minusAmount(ticket.getFee());

    result = ticket.getFee();

    // postcondition
    if (result < 0) {
      throw new Error('ticket fee should be greater than or equal to 0');
    }

    return result;
  };

  private hasInvitation = (): boolean => {
    return this.invitation !== undefined;
  };

  private setTicket = (ticket: Ticket): void => {
    this.ticket = ticket;
  };

  private minusAmount = (amount: number): void => {
    this.amount -= amount;
  };

  private plusAmount = (amount: number): void => {
    this.amount += amount;
  };
}

import { Bag } from './bag';
import { Ticket } from './ticket';

export class Audience {
  private bag: Bag;

  public constructor(bag: Bag) {
    this.bag = bag;
  }

  public buy = (ticket: Ticket): number => {
    return this.bag.hold(ticket);
  };
}

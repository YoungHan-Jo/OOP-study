import { Bag } from "./bag";
import { Ticket } from "./ticket";

export class Audience {
    private bag: Bag;

    public constructor(bag: Bag) {
        this.bag = bag;
    }

    public buy = (ticket: Ticket): number => {
        if (this.bag.hasInvitation()) {
            this.bag.setTicket(ticket);
            return 0;
        }

        this.bag.setTicket(ticket);
        this.bag.minusAmount(ticket.getFee());

        return ticket.getFee();
    }
}
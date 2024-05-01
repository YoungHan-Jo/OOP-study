import { Audience } from "./audience";
import { TicketSeller } from "./ticketSeller";

export class Theater {
    private ticketSeller: TicketSeller;

    public constructor(ticketSeller: TicketSeller) {
        this.ticketSeller = ticketSeller;
    }

    public enter = (audience: Audience): void => {
        this.ticketSeller.sellTo(audience);
    }
}
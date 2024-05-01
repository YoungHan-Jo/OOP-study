import { Audience } from "./audience";
import { TicketOffice } from "./ticketOffice";

export class TicketSeller {
    private ticketOffice: TicketOffice;

    public constructor(ticketOffice: TicketOffice) {
        this.ticketOffice = ticketOffice;
    }

    public sellTo = (audience: Audience): void => {
        this.ticketOffice.sellTicketTo(audience);
    }

}
class TicketSeller {
    private ticketOffice: TicketOffice;

    public constructor(ticketOffice: TicketOffice) {
        this.ticketOffice = ticketOffice;
    }

    public getTicketOffice = (): TicketOffice => {
        return this.ticketOffice;
    }

}
class TicketSeller {
    private ticketOffice: TicketOffice;

    public constructor(ticketOffice: TicketOffice) {
        this.ticketOffice = ticketOffice;
    }

    public sellTo = (audience: Audience): void => {
        if (audience.getBag().hasInvitation()) {
            const ticket = this.ticketOffice.getTicket();
            audience.getBag().setTicket(ticket);
            return;
        }

        const ticket = this.ticketOffice.getTicket();
        const ticketFee = ticket.getFee();
        audience.getBag().minusAmount(ticketFee);
        this.ticketOffice.plusAmount(ticketFee);
        audience.getBag().setTicket(ticket);
        return;
    }

}
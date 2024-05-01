class Theater {
    private ticketSeller: TicketSeller;

    public constructor(ticketSeller: TicketSeller) {
        this.ticketSeller = ticketSeller;
    }

    public enter = (audience: Audience): void => {
        if (audience.getBag().hasInvitation()) {
            const ticket = this.ticketSeller.getTicketOffice().getTicket();
            audience.getBag().setTicket(ticket);
            return;
        }

        const ticket = this.ticketSeller.getTicketOffice().getTicket();
        const ticketFee = ticket.getFee();
        audience.getBag().minusAmount(ticketFee);
        this.ticketSeller.getTicketOffice().plusAmount(ticketFee);
        audience.getBag().setTicket(ticket);

        return;
    }
}
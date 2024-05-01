class Bag {
    private amount: number;
    private invitation?: Invitation;
    private ticket?: Ticket;

    public constructor(amount: number, invitation?: Invitation) {
        this.amount = amount;
        this.invitation = invitation;
    }

    public hasInvitation = (): boolean => {
        return !this.invitation;
    }

    public hasTicket = (): boolean => {
        return !this.ticket;
    }

    public setTicket = (ticket: Ticket): void => {
        this.ticket = ticket;
    }

    public minusAmount = (amount: number): void => {
        this.amount -= amount;
    }

    public plusAmount = (amount: number): void => {
        this.amount += amount;
    }
}
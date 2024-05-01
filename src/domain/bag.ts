import { Invitation } from "./invitation";
import { Ticket } from "./ticket";

export class Bag {
    private amount: number;
    private invitation?: Invitation;
    private ticket?: Ticket;

    public constructor(amount: number, invitation?: Invitation) {
        this.amount = amount;
        this.invitation = invitation;
    }

    public hasInvitation = (): boolean => {
        return this.invitation !== undefined;
    }

    public hasTicket = (): boolean => {
        return this.ticket !== undefined;
    }

    public setTicket = (ticket: Ticket): void => {
        this.ticket = ticket;
    }

    public getAmount = (): number => {
        return this.amount;
    }

    public minusAmount = (amount: number): void => {
        this.amount -= amount;
    }

    public plusAmount = (amount: number): void => {
        this.amount += amount;
    }
}
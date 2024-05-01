import { Audience } from "./audience";
import { Ticket } from "./ticket";

export class TicketOffice {
    private amount: number;
    private tickets: Ticket[] = [];

    public constructor(amount: number, tickets: Ticket[]) {
        this.amount = amount;
        this.tickets.push(...tickets);
    }

    public getAmount = (): number => {
        return this.amount;
    }

    public sellTicketTo = (audience: Audience): void => {
        this.plusAmount(audience.buy(this.getTicket()));
    }

    private getTicket = (): Ticket => {
        return this.tickets.shift(); // index0の要素を取り出す
    }

    private minusAmount = (amount: number): void => {
        this.amount -= amount;
    }

    private plusAmount = (amount: number): void => {
        this.amount += amount;
    }

}
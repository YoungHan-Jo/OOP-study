class TicketOffice {
    private amount: number;
    private tickets: Ticket[] = [];

    public constructor(amount: number, tickets: Ticket[]) {
        this.amount = amount;
        this.tickets.push(...tickets);
    }

    public getTicket = (): Ticket => {
        return this.tickets.shift(); // index0の要素を取り出す
    }

    public minusAmount = (amount: number): void => {
        this.amount -= amount;
    }

    public plusAmount = (amount: number): void => {
        this.amount += amount;
    }

}
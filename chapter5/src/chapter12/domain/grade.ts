export class Grade {
    private name: string;
    private upper: number;
    private lower: number;

    public constructor({ name, upper, lower }: {
        name: string,
        upper: number,
        lower: number
    }) {
        this.name = name;
        this.upper = upper;
        this.lower = lower;
    }

    public getName(): string {
        return this.name;
    }

    public isName(name: string): boolean {
        return this.name === name;
    }

    public include(score: number): boolean {
        return score >= this.lower && score <= this.upper;
    }


}
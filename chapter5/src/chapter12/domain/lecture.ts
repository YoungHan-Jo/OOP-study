export class Lecture {
    private pass: number;
    private title: string;
    private scores: number[];

    public constructor({ title, pass, scores }: {
        title: string,
        pass: number,
        scores: number[]
    }) {
        this.title = title;
        this.pass = pass;
        this.scores = scores;
    }

    public average(some?: any): number {
        return this.scores.reduce((a, b) => a + b) / this.scores.length;
    }
    public getScores(): number[] {
        return this.scores;
    }

    public stats(): string {
        return this.getMethod();
    }

    public getMethod(): string {
        return 'Lecture : getMethod'
    }

    public evaluate(): string {
        return `Pass:${this.passCount()} Fail:${this.failCount()}`;
    }

    private passCount(): number {
        return this.scores.filter(score => score >= this.pass).length;
    }

    private failCount(): number {
        return this.scores.filter(score => score < this.pass).length;
    }

}
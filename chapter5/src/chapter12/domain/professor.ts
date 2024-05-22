import { Lecture } from "./lecture";

export class Professor {
    private name: string;
    private lecture: Lecture;

    public constructor({ name, lecture }: { name: string, lecture: Lecture }) {
        this.name = name;
        this.lecture = lecture;
    }

    public compileStatistics(): string {
        return `[${this.name}] ${this.lecture.evaluate()} - AVG: ${this.lecture.average()}`
    }
}
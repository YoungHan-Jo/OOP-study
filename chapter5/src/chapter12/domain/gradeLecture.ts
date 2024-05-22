import { Grade } from "./grade";
import { Lecture } from "./lecture";

export class GradeLecture extends Lecture {
    private grades: Grade[];

    public constructor({
        title,
        pass,
        scores,
        grades
    }: {
        title: string,
        pass: number,
        scores: number[],
        grades: Grade[]
    }) {
        super({ title, pass, scores });
        this.grades = grades;
    }

    public evaluate(): string {
        return super.evaluate() + ', ' + this.gradesStatistics();
    }

    public average(gradeName?: string): number {
        if (!gradeName) return super.average();
        const grade = this.grades.filter(grade => grade.isName(gradeName))[0];
        if (!grade) return 0;
        return this.gradeAverage(grade);
    }

    public getMethod(): string {
        return 'GradeLecture : getMethod'
    }

    private gradeAverage(grade: Grade): number {
        const matchingScores = this.getScores().filter(score => grade.include(score))
        return matchingScores.reduce((a, b) => a + b) / matchingScores.length;
    }

    private gradesStatistics(): string {
        return this.grades.map(grade => this.format(grade)).join(' ')
    }

    private format(grade: Grade): string {
        return `${grade.getName()}:${this.gradeCount(grade)}`
    }

    private gradeCount(grade: Grade): number {
        return this.getScores().filter(score => grade.include(score)).length;
    }
}
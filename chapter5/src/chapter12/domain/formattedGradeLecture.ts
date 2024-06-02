import { Grade } from "./grade";
import { GradeLecture } from "./gradeLecture";

export class FormattedGradeLecture extends GradeLecture {

    public constructor({
        name,
        pass,
        grades,
        scores
    }: {
        name: string,
        pass: number,
        grades: Grade[],
        scores: number[]
    }) {
        super({ title: name, pass, grades, scores });
    }

    public formatAverage(): string {
        return `Avg: ${super.average()}`;
    }
}
import { Grade } from "./grade";
import { GradeLecture } from "./gradeLecture";
import { Lecture } from "./lecture"
import { Professor } from "./professor";

describe('Domain', () => {
    it('lecture evaluate()', () => {
        //Given
        const lecture = new Lecture({
            title: 'OOP',
            pass: 70,
            scores: [100, 80, 90, 60, 70]
        })

        //When
        const result = lecture.evaluate();

        //Then
        expect(result).toBe('Pass:4 Fail:1')

    })

    it('grade lecture : evaluate()', () => {
        //Given
        const gradeLecture = new GradeLecture({
            title: 'OOP',
            pass: 70,
            scores: [81, 95, 75, 50, 45],
            grades: [
                new Grade({ name: 'A', upper: 100, lower: 95 }),
                new Grade({ name: 'B', upper: 94, lower: 80 }),
                new Grade({ name: 'C', upper: 79, lower: 70 }),
                new Grade({ name: 'D', upper: 69, lower: 50 }),
                new Grade({ name: 'F', upper: 49, lower: 0 })
            ]
        })
        console.log(gradeLecture.stats())
        // gradeLecture에는 stats() 메서드가 없지만,
        // Lecture에 stats() 메서드가 있어서 GradeLecture에서도 사용 가능
        // Lecture에 있는 stats()는 this.getMethod()를 호출하고 있지만
        // Lecture을 상속받은 GradeLecture에서는 getMethod()를 오버라이드 하고 있어서
        // GradeLecture의 getMethod()가 호출된다.

        //When
        const result = gradeLecture.evaluate();

        //Then
        expect(result).toBe('Pass:3 Fail:2, A:1 B:1 C:1 D:1 F:1')

    })

    it('professor compileStatistics()', () => {
        // Given
        const professor = new Professor({
            name: 'Kim',
            lecture: new Lecture({
                title: 'OOP',
                pass: 70,
                scores: [81, 95, 75, 50, 45]
            })
        })
        // When
        const result = professor.compileStatistics();

        // Then
        expect(result).toBe('[Kim] Pass:3 Fail:2 - AVG: 69.2')

    })

    it('professor compileStatistics(), GradeLecture', () => {
        // Given
        const professor = new Professor({
            name: 'Kim',
            lecture: new GradeLecture({
                title: 'OOP',
                pass: 70,
                scores: [81, 95, 75, 50, 45],
                grades: [
                    new Grade({ name: 'A', upper: 100, lower: 95 }),
                    new Grade({ name: 'B', upper: 94, lower: 80 }),
                    new Grade({ name: 'C', upper: 79, lower: 70 }),
                    new Grade({ name: 'D', upper: 69, lower: 50 }),
                    new Grade({ name: 'F', upper: 49, lower: 0 })
                ]
            })
        })
        // When
        const result = professor.compileStatistics();

        // Then
        expect(result).toBe('[Kim] Pass:3 Fail:2, A:1 B:1 C:1 D:1 F:1 - AVG: 69.2')

    })
})
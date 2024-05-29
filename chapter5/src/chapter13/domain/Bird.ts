export class Bird {

}

export class FlyingBird extends Bird {

    public fly(): void {
        console.log('I am flying');
    }
}

export class Penguin extends Bird {

}

export const flyBird = (bird: FlyingBird): void => {
    bird.fly();
}
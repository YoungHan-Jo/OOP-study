interface Flyer {
    fly(): void;
}

interface Walker {
    walk(): void;
}

class Bird implements Flyer, Walker {
    fly(): void {
        console.log('Bird is flying');
    }

    walk(): void {
        console.log('Bird is walking');
    }
}

class Penguin implements Walker {
    walk(): void {
        console.log('Penguin is walking');
    }
}
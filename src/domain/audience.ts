class Audience {
    private bag: Bag;

    public constructor(bag: Bag) {
        this.bag = bag;
    }

    public getBag = (): Bag => {
        return this.bag;
    }
}
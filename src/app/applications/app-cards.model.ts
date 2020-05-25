export class AppCard {
    public name: string;
    public routerLink: string;
    public imagePath: string;

    constructor(name: string, rLink: string, imgPath: string) {
        this.name = name;
        this.routerLink = rLink;
        this.imagePath = imgPath;
    }
}

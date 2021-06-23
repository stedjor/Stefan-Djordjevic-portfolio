export interface Cars {
    id?: string;
    autor: string;
    autorId: string;
    date: Date;
    imgAfsId: string; // Folder Id in firebase storage
    images: string[];
    car: {
        age: string;
        price: string;
        brand: string;
        model: string;
        carMark: string;
        engine: number;
        transmission: string;
        mileage: number;
        kwKs: number;
        fuels: string;
        colors: string;
        doors: string;
        seats: number;
    };
    saller: {
        countries: string;
        town: string;
        adress: string;
        adressNumber: number;
    };
    comments: any[];
}

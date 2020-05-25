import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarsInfoService {

  constructor() {
    this.allYears();
  }

  carsInfo = {
    brands: [
      {
        name: 'Alfa Romeo',
        models: ['147', '159', '166', 'GT', 'GTV', 'Giulia', 'Giuiletta', 'MiTo', 'Stelvio'],
      },
      {
        name: 'Audi',
        models: ['80', '90', '100', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
          'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'R8', 'TT']
      },
      {
        name: 'BMW',
        models: ['Seria 1', 'Seria 2', 'Seria 3', 'Seria 4', 'Seria 5', 'Seria 6', 'Seria 7', 'Seria 8',
          'Seria M', 'Seria X', 'Seria i', 'Seria Z']
      },
      {
        name: 'Chevrolet',
        models: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'DS', 'Xsara']
      },
      {
        name: 'Citroen',
        models: ['Aveo', 'Camaro', 'Captiva', 'Corvette', 'Cruze', 'Impala', 'Orlando', 'Spark', 'Suburban', 'Trailblazer']
      },
      {
        name: 'Dacia',
        models: ['Duster', 'Logan', 'Lodgy', 'Nova', 'Sandero', 'Stepway']
      },
      {
        name: 'Fiat',
        models: ['500L', 'Bravo', 'Brava', 'Grande Punto', 'Marea', 'Panda', 'Punto', 'Stilo', 'Uno']
      },
      {
        name: 'Ford',
        models: ['Capri', 'GT', 'Festiva', 'Fiesta', 'Focus', 'Kuga', 'Mondeo', 'Mustang', 'Raptor', 'Sierra', 'Super Duty']
      },
      {
        name: 'Honda',
        models: ['Accord', 'Civic', 'CR-V', 'CRX', 'HRV', 'Legend', 'NSX', 'Prelude', 'Stream']
      },
      {
        name: 'Hyundai',
        models: ['Accent', 'Coupe', 'i20', 'i30', 'Elanta', 'Santa Fe', 'Tucson']
      },
      {
        name: 'Jaguar',
        models: ['E Pace', 'F Type', 'F Pace', 'I Pace', 'S Type', 'X Type', 'XE', 'XF', 'XJ', 'XK']
      },
      {
        name: 'Lada',
        models: ['Granta', 'Kalina', 'Niva', 'Riva', 'Samara', 'Vesta']
      },
      {
        name: 'Mazda',
        models: ['CX-3', 'CX-5', 'CX-7', 'CX-30', 'MX-3', 'MX-5', 'MX-6', 'RX-8']
      },
      {
        name: 'Mercedes',
        models: ['A Class', 'B Class', 'C Class', 'E Class', 'G Class', 'GL Class',
          'GT Class', 'ML Class', 'R Class', 'S Class', 'X Class']
      },
      {
        name: 'Mitsubishi',
        models: ['ASX', 'Carisma', 'Colt', 'Eclipse', 'Lancer', 'Pajero', 'Space Star']
      },
      {
        name: 'Nissan',
        models: ['350z', 'GT-R', 'Kicks', 'Juke', 'Micra', 'Qashqai', 'Sentra', 'Skyline', 'Versa']
      },
      {
        name: 'Opel',
        models: ['Antara', 'Ascona', 'Astra', 'Corsa', 'Insignia', 'Kadett', 'Meriva', 'Omega', 'Tigra',
          'Vectra', 'Zafira']
      },
      {
        name: 'Peugeot',
        models: ['104', '106', '107', '108', '204', '205', '206', '207', '208', '301', '305', '306', '307', '308',
          '404', '405', '406', '407', '504', '508', '605', '607', '806', '807', '1007', '3008', '4008']
      },
      {
        name: 'Porsche',
        models: ['911', '924', '928', '944', 'Boxter', 'Cayenne', 'Macan', 'Panamera']
      },
      {
        name: 'Renault',
        models: ['Captur', 'Clio', 'Espace', 'Express', 'Fluence', 'Kadjar', 'Kangoo', 'Laguna', 'Megane',
          'Scenic', 'Talisman', 'Twingo']
      },
      {
        name: 'Seat',
        models: ['Alhambra', 'Altea', 'Arona', 'Ateca', 'Cupra', 'Ibiza', 'Leon', 'Tarraco', 'Toledo']
      },
      {
        name: 'Škoda',
        models: ['Fabia', 'Felicia', 'Kamiq', 'Karoq', 'Kodiaq', 'Octavia', 'Praktik', 'Rapid', 'Scala', 'Superb']
      },
      {
        name: 'Toyota',
        models: ['Auris', 'Aygo', 'Camry', 'Corolla', 'RAV 4', 'Supra', 'Yaris']
      },
      {
        name: 'Volkswagen',
        models: ['Amarok', 'Arteon', 'Bora', 'Buggy', 'Buba', 'Caddy', 'Golf', 'Yeta', 'Lupo', 'Passat',
          'Polo', 'Scirocco', 'Sharan', 'Tiguan', 'Tuareg', 'Touran', 'Up!', 'Vento']
      },
      {
        name: 'Zastava',
        models: ['10', '101', '128', '750', '850', '1300', '15300', 'Florida', 'Yugo']
      }
    ],
    carMark: '',
    fuels: ['Gasoline', 'Diesel', 'Gas', 'Hybrid', 'Electric'],
    engine: 0,
    kwKs: 0,
    mileage: 0,
    transmission: ['Automatic', 'Manual'],
    years: [],
    doors: ['2/3', '4/5'],
    seats: [2, 3, 4, 5, 6, 7, 8],
    colors: ['Red', 'Yellow', 'Blue', 'Green', 'Black', 'White', 'Gray', 'Orange', 'Brown',
      'Purlpe', 'Pink'],
    countries: [
      { name: 'Albania', flag: '' },
      { name: 'Andorra', flag: '' },
      { name: 'Armenia', flag: '' },
      { name: 'Austria', flag: '' },
      { name: 'Azerbaijan', flag: '' },

      { name: 'Belarus', flag: '' },
      { name: 'Belgium', flag: '' },
      { name: 'Bosnia and Herzegovina', flag: '' },
      { name: 'Bulgaria', flag: '' },
      { name: 'Croatia', flag: '' },

      { name: 'Cyprus', flag: '' },
      { name: 'Czech Republic', flag: '' },
      { name: 'Denmark', flag: '' },
      { name: 'Estonia', flag: '' },
      { name: 'Finland', flag: '' },

      { name: 'France', flag: '' },
      { name: 'Georgia', flag: '' },
      { name: 'Germany', flag: '' },
      { name: 'Greece', flag: '' },
      { name: 'Hungary', flag: '' },

      { name: 'Iceland', flag: '' },
      { name: 'Ireland', flag: '' },
      { name: 'Italy', flag: '' },
      { name: 'Kayakhstan', flag: '' },
      { name: 'Latvia', flag: '' },

      { name: 'Liechtenstein', flag: '' },
      { name: 'Lithuania', flag: '' },
      { name: 'Luxembourg', flag: '' },
      { name: 'Malta', flag: '' },
      { name: 'Moldova', flag: '' },

      { name: 'Monaco', flag: '' },
      { name: 'Montenegro', flag: '' },
      { name: 'Netherlands', flag: '' },
      { name: 'North Macedonia', flag: '' },
      { name: 'Norway', flag: '' },

      { name: 'Poland', flag: '' },
      { name: 'Portugal', flag: '' },
      { name: 'Romania', flag: '' },
      { name: 'Russia', flag: '' },
      { name: 'San Marino', flag: '' },

      { name: 'Serbia', flag: './assets/flags/serbia-flag-round.png' },
      { name: 'Slovakia', flag: '' },
      { name: 'Slovenia', flag: '' },
      { name: 'Spain', flag: '' },
      { name: 'Sweden', flag: '' },

      { name: 'Switzerland', flag: '' },
      { name: 'Turkey', flag: '' },
      { name: 'Ukraine', flag: '' },
      { name: 'United Kingdom', flag: '' },
      { name: 'Vatican City', flag: '' }
    ]
  };

  allYears() {
    const date = new Date();
    for (let i = 1900; i <= date.getFullYear(); i++) {
      this.carsInfo.years.push(i);
    }
    this.carsInfo.years.sort((a, b) => b - a);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FsServicesService {
  constructor(private http: HttpClient) { }
  lat = 0;
  lng = 0;
  url1 = 'https://api.foursquare.com/v2/venues/explore?ll=';
  url2 = '&client_id=E5KM5VAZBFI2VEUVWLVFJF0AHO1LJWYFOC155AN14TSPTUW1';
  url3 = '&client_secret=QBAHUNPEMG2EDOWZTKX3H4VNTUYEC4EIJ0UXIKB20M5HQHZG&v=20130619&query=';

  getInfomation(target: string) {
    return this.http.get(`${this.url1 + this.lat},${this.lng + this.url2 + this.url3 + target}`);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}

import { FsKeysService } from 'src/app/_services/fs/fs-keys/fs-keys.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FsServicesService {
  constructor(private http: HttpClient, private fsKeys: FsKeysService) { }
  lat = 0;
  lng = 0;
  urlPart1 = 'https://api.foursquare.com/v2/venues/explore?ll=';
  urlPart2 = `&client_id=${this.fsKeys.client.client_id}`;
  urlPart3 = `&client_secret=${this.fsKeys.client.clieant_secret}&query=`;

  getInfomation(target: string) {
    return this.http.get(`${this.urlPart1 + this.lat},${this.lng + this.urlPart2 + this.urlPart3 + target}`);
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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private _httpClient: HttpClient) { }

  apiConnectionIsAvailable() {
    const endPoint = `${environment.api.urlBase}/Products`;
    return this._httpClient.get<Product[]>(endPoint, { observe: 'response' });
  }
}

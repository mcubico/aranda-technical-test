import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Guid } from "guid-typescript";

import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

const CONTROLLER = 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _httpClient: HttpClient) { }

  all(): Observable<Product[]> {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;
    return this._httpClient.get<Product[]>(endPoint);
  }

  register(data: Product): Observable<Product> {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;
    data.id = Guid.create().toString();
    data.active = true;
    return this._httpClient.post<Product>(endPoint, data);
  }

  edit(data: Product, id: string): Observable<Product> {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}/${id}`;
    return this._httpClient.put<Product>(endPoint, data);
  }

  delete(id: string) {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}/${id}`;
    return this._httpClient.delete<Product>(endPoint);
  }
}

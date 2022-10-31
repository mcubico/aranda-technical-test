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

  all(page: number = 1, size: number = 5, sortBy: string = 'name', directionAsc: boolean = true): Observable<Product[]> {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}?page=${++page}&itemsPerPage=${size}&sortBy=${sortBy}&directionAsc=${directionAsc}`;
    return this._httpClient.get<Product[]>(endPoint);
  }

  register(data: Product, file?: File): Observable<Product> {
    const formData = this._convertToFormData(data, file)

    console.log(formData);
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;

    data.id = Guid.create().toString();

    return this._httpClient.post<Product>(endPoint, formData);
  }

  edit(data: Product, id: string, file?: File): Observable<Product> {
    data.id = id;
    const formData = this._convertToFormData(data, file)

    console.log(formData);
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;

    return this._httpClient.put<Product>(endPoint, formData);
  }

  delete(id: string) {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}/${id}`;
    return this._httpClient.delete<Product>(endPoint);
  }

  totalProducts() {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}/total`;
    return this._httpClient.get<number>(endPoint);
  }

  private _convertToFormData(data: Product, file?: File): FormData {
    const formData = new FormData();

    formData.append('id', data.id);
    formData.append('name', data.name);
    formData.append('category', data.category);
    formData.append('description', data.description ?? '');
    formData.append('image', data.image ?? '');
    if (file != null)
      formData.append('file', file, file.name);

    return formData;
  }
}

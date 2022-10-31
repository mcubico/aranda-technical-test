import { Search } from './../models/search.model';
import { Pagination } from './../models/pagination.model';
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

  register(data: Product, file?: File): Observable<Product> {
    const formData = this.convertToFormData(data, file)

    console.log(formData);
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;

    data.id = Guid.create().toString();

    return this._httpClient.post<Product>(endPoint, formData);
  }

  edit(data: Product, id: string, file?: File): Observable<Product> {
    data.id = id;
    const formData = this.convertToFormData(data, file)

    console.log(formData);
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;

    return this._httpClient.put<Product>(endPoint, formData);
  }

  delete(id: string) {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}/${id}`;
    return this._httpClient.delete<Product>(endPoint);
  }

  all(paginationData: Pagination): Observable<Product[]> {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}?page=${++paginationData.page}&itemsPerPage=${paginationData.size}&sortBy=${paginationData.sortBy}&directionAsc=${paginationData.directionAsc}`;
    return this._httpClient.get<Product[]>(endPoint);
  }

  search(filter: Search) {
    let endPoint = `${environment.api.urlBase}/${CONTROLLER}?page=${++filter.page}&itemsPerPage=${filter.size}&sortBy=${filter.sortBy}&directionAsc=${filter.directionAsc}`;
    if (filter.name != undefined)
      endPoint += `&name=${filter.name}`;

    if (filter.description != undefined)
      endPoint += `&description=${filter.description}`;

    if (filter.category != undefined)
      endPoint += `&category=${filter.category}`;

    return this._httpClient.get<Product[]>(endPoint);
  }

  totalProducts() {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}/total`;
    return this._httpClient.get<number>(endPoint);
  }

  private convertToFormData(data: Product, file?: File): FormData {
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

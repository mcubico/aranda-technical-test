import { Search } from './../models/search.model';
import { Pagination } from './../models/pagination.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
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

  all(paginationData: Pagination): Observable<HttpResponse<Product[]>> {
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;
    const queryParams = new HttpParams();
    queryParams.append('page', ++paginationData.page);
    queryParams.append('itemsPerPage', paginationData.size);
    queryParams.append('sortBy', paginationData.sortBy ?? '');
    queryParams.append('directionAsc', paginationData.directionAsc);

    return this._httpClient.get<Product[]>(endPoint, {
      observe: 'response',
      params: queryParams
    });
  }

  search(filter: Search): Observable<HttpResponse<Product[]>> {
    let endPoint = `${environment.api.urlBase}/${CONTROLLER}/filter`;
    const queryParams = new HttpParams();
    queryParams.append('page', ++filter.page);
    queryParams.append('itemsPerPage', filter.size);
    queryParams.append('sortBy', filter.sortBy ?? '');
    queryParams.append('directionAsc', filter.directionAsc);
    
    if (filter.name != undefined)
      queryParams.append('name', filter.name);

    if (filter.description != undefined)
      queryParams.append('description', filter.description);

    if (filter.category != undefined)
      queryParams.append('category', filter.category);

    return this._httpClient.get<Product[]>(endPoint, {
      observe: 'response',
      params: queryParams
    });
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

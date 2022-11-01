import { map, catchError } from 'rxjs/operators';
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
    this.isLoading = true;
    const formData = this.convertToFormData(data, file);
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;

    data.id = Guid.create().toString();

    return this._httpClient.post<Product>(endPoint, formData)
      .pipe(
        map((response) => {
          this.isLoading = false;
          this.productRegistered = true;

          return response;
        }),
        catchError(() => {
          this.isLoading = false;
          return [];
        })
      );
  }

  edit(data: Product, id: string, file?: File): Observable<Product> {
    this.isLoading = true;
    data.id = id;

    const formData = this.convertToFormData(data, file);
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;

    return this._httpClient.put<Product>(endPoint, formData)
      .pipe(
        map((response) => {
          this.isLoading = false;
          return response;
        })
      );
  }

  delete(id: string) {
    this.isLoading = true;
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}/${id}`;

    return this._httpClient.delete<Product>(endPoint)
      .pipe(
        map((response) => {
          this.isLoading = false;
          return response;
        }),
        catchError(() => {
          this.isLoading = false;
          return [];
        })
      );
  }

  all(paginationData: Pagination): Observable<HttpResponse<Product[]>> {
    this.isLoading = true;
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}`;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', ++paginationData.page);
    queryParams = queryParams.append('itemsPerPage', paginationData.size);
    queryParams = queryParams.append('sortBy', paginationData.sortBy ?? '');
    queryParams = queryParams.append('directionAsc', paginationData.directionAsc);

    return this._httpClient.get<Product[]>(endPoint, {
      observe: 'response',
      params: queryParams
    }).pipe(
      map((response) => {
        this.isLoading = false;
        return response;
      }),
      catchError(() => {
        this.isLoading = false;
        return [];
      })
    );
  }

  search(filter: Search): Observable<HttpResponse<Product[]>> {
    this.isLoading = true;
    let endPoint = `${environment.api.urlBase}/${CONTROLLER}/filter`;
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', ++filter.page);
    queryParams = queryParams.append('itemsPerPage', filter.size);
    queryParams = queryParams.append('sortBy', filter.sortBy ?? '');
    queryParams = queryParams.append('directionAsc', filter.directionAsc);

    if (filter.name != undefined)
      queryParams = queryParams.append('name', filter.name);

    if (filter.description != undefined)
      queryParams = queryParams.append('description', filter.description);

    if (filter.category != undefined)
      queryParams = queryParams.append('category', filter.category);

    return this._httpClient.get<Product[]>(endPoint, {
      observe: 'response',
      params: queryParams
    }).pipe(
      map((response) => {
        this.isLoading = false;
        return response;
      }),
      catchError(() => {
        this.isLoading = false;
        return [];
      })
    );
  }

  totalProducts() {
    this.isLoading = true;
    const endPoint = `${environment.api.urlBase}/${CONTROLLER}/total`;

    return this._httpClient.get<number>(endPoint).pipe(
      map((response) => {
        this.isLoading = false;
        return response;
      }),
      catchError(() => {
        this.isLoading = false;
        return [];
      })
    );
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

  private _isLoading: boolean = false;
  public get isLoading() : boolean {
    return this._isLoading;
  }

  public set isLoading(v : boolean) {
    this._isLoading = v;
  }


  private _productRegistered : boolean = false;
  public get productRegistered() : boolean {
    return this._productRegistered;
  }

  public set productRegistered(v : boolean) {
    this._productRegistered = v;
  }


}

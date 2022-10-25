import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getAll(): Product[] {
    return [
      {
        id: 'fc390589-ecc2-44f2-bdd2-64da3e6d87ec',
        name: 'Product 1',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: 'ca88c9d8-76c9-4dba-9f69-d726db3a7dba',
        name: 'Product 2',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: '530961ed-fc53-46ea-af3a-f3c5822c97be',
        name: 'Product 3',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: '79a7a3dc-08a6-40dd-b17f-aef49ea140a0',
        name: 'Product 4',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: 'cfca6cf9-cdff-4468-878e-06184fcfe7f3',
        name: 'Product 5',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: '2a82e93f-b57a-4316-826a-939ac3d5358a',
        name: 'Product 6',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: '1b5c549f-3aac-4ee7-be09-b5cf49f3e994',
        name: 'Product 7',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: '471fe17e-93e9-43a8-95d2-ea71e69584f6',
        name: 'Product 8',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: 'bc5988fd-2c1e-49eb-b6e4-88b1a6b54829',
        name: 'Product 9',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: '84267da6-9c32-45fd-a9da-f63445dd5214',
        name: 'Product 10',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
      {
        id: 'a46054e5-0faf-442e-85f9-9cd4459ca123',
        name: 'Product 1',
        category: 'Category 1',
        description: 'Product description',
        picture: 'Picture path',
        active: true,
      },
    ];
  }
}

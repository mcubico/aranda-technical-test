import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { ProductService } from './../../services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['name', 'description', 'category', 'action'];

  constructor(
    private _productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer) {
    this.dataSource = new MatTableDataSource<Product>(this._productService.getAll());
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  add(data: Product): void {
    console.log('add');
  }

  edit(data: Product): void {
    console.log('edit');
  }

  delete(id: string): void {
    console.log('delete');
  }
}

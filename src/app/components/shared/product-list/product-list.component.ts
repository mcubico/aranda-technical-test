import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductDialogComponent } from '../dialog/create-product/product-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['name', 'description', 'category', 'action'];

  constructor(
    private _productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private _dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productService.all()
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (error) => {
          alert('Error while fetching the products');
        }
      });
  }

  edit(data: Product) {
    this._dialog.open(ProductDialogComponent, {
      width: '30%',
      data
    }).afterClosed().subscribe({
      next: () => {
        this.getAllProducts();
      }
    });
  }

  delete(id: string) {
    this._productService.delete(id).subscribe({
      next: () => {
        alert('Product deleted successfully');
        this.getAllProducts();
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

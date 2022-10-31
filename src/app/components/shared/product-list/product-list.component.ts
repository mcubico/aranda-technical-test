import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  totalRows: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  isLoading: boolean = false;
  sortActive: string = 'name';
  sortDirectionAsc: boolean = true;

  constructor(
    private _productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private _dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.setTotalProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllProducts() {
    this.isLoading = true;

    this._productService.all(this.currentPage, this.pageSize, this.sortActive, this.sortDirectionAsc)
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        error: (error) => {
          alert('Error while fetching the products');
          this.isLoading = false;
        }
      });
  }

  setTotalProducts() {
    this._productService.totalProducts()
      .subscribe({
        next: (total) => {
          this.totalRows = total;
        },
        error: (error) => {
          alert('Error while fetching total products');
        }
      })
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
        this.setTotalProducts();
        this.getAllProducts();
      }
    });
  }

  pageChanged(event: PageEvent) {
    console.log(event);
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAllProducts();
  }

  announceSortChange(sortState: Sort) {
    this.sortActive = sortState.active;

    console.log(sortState);

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction} ending`);
      this.sortDirectionAsc = sortState.direction == 'asc';
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
      this.sortActive = '';
      this.sortDirectionAsc = true;
    }

    this.getAllProducts();
  }

}

import { Pagination } from './../../../models/pagination.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductDialogComponent } from '../dialog/create-product/product-dialog.component';
import { Search } from 'src/app/models/search.model';

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
  sortActive: string = '';
  sortDirectionAsc: boolean = true;

  private _nameFilter: string | undefined;
  private _descriptionFilter: string | undefined;
  private _categoryFilter: string | undefined;

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

    const paginationData: Pagination = {
      page: this.currentPage,
      size: this.pageSize,
      sortBy: this.sortActive,
      directionAsc: this.sortDirectionAsc
    };

    this._productService.all(paginationData)
      .subscribe({
        next: (response) => {
          console.log(response.headers.has('x-total-records'));
          this.dataSource.data = response.body ?? [];
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

  applyFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.setFilterValue(column, filterValue);
    if (filterValue.length >= 3)
      //this.dataSource.filter = filterValue.trim().toLowerCase();
      this.getAllProductsFiltered();
    else if (filterValue.length == 0)
      this.getAllProducts();
  }

  private setFilterValue(column: string, value: string) {
    switch (column) {
      case 'name':
        this.nameFilter = value;
        break;
      case 'description':
        this.descriptionFilter = value;
        break;
      case 'category':
        this.categoryFilter = value;
        break;
    }
  }

  private set nameFilter(value: string | undefined) {
    if (value != undefined && value.length >= 3)
      this._nameFilter = value;
    else
      this._nameFilter = undefined;
  }

  private get nameFilter() : string | undefined {
    return this._nameFilter;
  }

  private set descriptionFilter(value: string | undefined) {
    if (value != undefined && value.length >= 3)
      this._descriptionFilter = value;
    else
      this._descriptionFilter = undefined;
  }

  private get descriptionFilter(): string | undefined {
    return this._descriptionFilter;
  }

  private set categoryFilter(value: string | undefined) {
    if (value != undefined && value.length >= 3)
      this._categoryFilter = value;
    else
      this._categoryFilter = undefined;
  }

  private get categoryFilter(): string | undefined {
    return this._categoryFilter;
  }

  private getAllProductsFiltered() {
    this.isLoading = true;

    const filterData: Search = {
      page: this.currentPage,
      size: this.pageSize,
      sortBy: this.sortActive,
      directionAsc: this.sortDirectionAsc,
      name: this.nameFilter,
      description: this.descriptionFilter,
      category: this.categoryFilter,
    };

    this._productService.search(filterData)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.body ?? [];
          this.dataSource.sort = this.sort;
          if (response.headers.has('x-total-records'))
            this.totalRows = Number(response.headers.has('x-total-records'));
          
          this.isLoading = false;
        },
        error: (error) => {
          alert('Error while fetching the products');
          this.isLoading = false;
        }
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../dialog/create-product/product-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Aranda Technical Test';

  constructor(private _dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this._dialog.open(ProductDialogComponent, {
      width: '30%'
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../dialog/create-product/create-product-dialog.component';

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
    this._dialog.open(CreateProductDialogComponent, {
      width: '30%'
    });
  }

}

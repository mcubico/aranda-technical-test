import { HttpErrorDialogComponent } from '../components/shared/dialog/http-error-dialog/http-error-dialog.component';
import { HttpErrorModel } from '../models/http-error.model';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class HttpErrorDialogService {
  public isDialogOpen: Boolean = false;

  constructor(public dialog: MatDialog) { }

  openDialog(data: HttpErrorModel): any {
    if (this.isDialogOpen) {
      return false;
    }

    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(HttpErrorDialogComponent, {
      width: '300px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
    });
  }
}

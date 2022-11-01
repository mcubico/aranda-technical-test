import { HttpErrorModel } from './../../../../models/http-error.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-http-error-dialog',
  templateUrl: './http-error-dialog.component.html',
  styleUrls: ['./http-error-dialog.component.css']
})
export class HttpErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: HttpErrorModel) { }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  showSnackbarAction(content: string, action: string = 'Close') {
    let snack = this._snackBar.open(content, action, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });

    snack.afterDismissed().subscribe(() => {
      console.debug("This will be shown after snackbar disappeared");
    });

    snack.onAction().subscribe(() => {
      console.debug("This will be called when snackbar button clicked");
    });
  }
}

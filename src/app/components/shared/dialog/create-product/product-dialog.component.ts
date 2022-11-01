import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { Product } from '../../../../models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  form !: FormGroup;
  submitButtonName: string = 'Save';
  fileName: string = '';

  private _file!: File;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Product,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<ProductDialogComponent>,
    private _notificationAlert: NotificationService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    if (this.editData) {
      this.fillForm();
    }
  }

  buildForm(): void {
    this.form = this._formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        category: ['', Validators.required],
        description: ['', Validators.maxLength(50)],
        image: [''],
        file: [''],
      }
    );
  }

  fillForm() {
    this.submitButtonName = 'Update';

    this.form.controls['name'].setValue(this.editData.name);
    this.form.controls['category'].setValue(this.editData.category);
    this.form.controls['description'].setValue(this.editData.description);
  }

  save(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      });

      return;
    }

    if (this.editData)
      this.update();
    else
      this.create();
  }

  private create() {
    this._productService.register(this.form.value, this._file)
      .subscribe({
        next: () => {
          this.form.reset();
          this._dialogRef.close('save');
          this._notificationAlert.showSnackbarAction('Product added successfully');
        },
        error: (error) => {
          console.error('Error while adding the product', error);
        }
      });
  }

  private update() {
    this._productService.edit(this.form.value, this.editData.id, this._file)
      .subscribe({
        next: () => {
          this._notificationAlert.showSnackbarAction('Product updated successfully');
          this.form.reset();
          this._dialogRef.close('update');
        },
        error: (error) => {
          console.error('Error while updating the product', error);
        }
      })
  }

  setFile(event: any) {
    this._file = event.target.files[0];
    this.fileName = this._file.name;
  }

  notSubmit() {
    return false;
  }

}

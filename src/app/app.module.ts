import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';
import { HttpErrorDialogComponent } from './components/shared/dialog/http-error-dialog/http-error-dialog.component';
import { HttpErrorDialogService } from './services/http-error-dialog.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { NotificationComponent } from './components/shared/notification/notification.component';
import { OfflineComponent } from './components/shared/offline/offline.component';
import { OnlineStatusModule } from 'ngx-online-status';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { ProductDialogComponent } from './components/shared/dialog/create-product/product-dialog.component';
import { ProductListComponent } from './components/shared/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    ProductDialogComponent,
    ProductListComponent,
    OfflineComponent,
    HttpErrorDialogComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCardModule,
    MatSnackBarModule,
    OnlineStatusModule,
  ],
  exports: [NotificationComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    HttpErrorDialogService
  ],
  entryComponents: [HttpErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

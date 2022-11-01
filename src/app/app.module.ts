import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card'
import { OnlineStatusModule } from 'ngx-online-status';

import { HttpConfigInterceptor } from './interceptors/http-config.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProductDialogComponent } from './components/shared/dialog/create-product/product-dialog.component';
import { ProductListComponent } from './components/shared/product-list/product-list.component';
import { OfflineComponent } from './components/shared/offline/offline.component';
import { HttpErrorDialogComponent } from './components/shared/dialog/http-error-dialog/http-error-dialog.component';
import { HttpErrorDialogService } from './services/http-error-dialog.service';

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
    OnlineStatusModule,
  ],
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

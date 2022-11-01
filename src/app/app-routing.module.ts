import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './pages/error/page-not-found/page-not-found.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  { path: 'error/page-not-found', component: PageNotFoundComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
